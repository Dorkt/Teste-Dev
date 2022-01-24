import { Classe } from '@src/database/models/classes';
import { Comments } from '@src/database/models/comments';
import { User } from '@src/database/models/users';
import AuthService from '@src/services/auth';

describe('Comments functional tests', () => {
    const defaultUser = {
        name: 'Gabriel Duque',
        email: 'gabrieldorkt@gmail.com',
        password: '1234',
    };

    let token: string;
    beforeEach(async () => {
        await Comments.deleteMany({});
        await User.deleteMany({});

        const user = await new User(defaultUser).save();
        token = AuthService.generateToken(user.toJSON());
    });
    describe('When creating a new comment', () => {
        it('should successfully create a new comment.', async () => {
            const newClass = {
                "name": "Classe de Finanças",
                "description": "Aula com o objetivo de ensinar crianças pequenas a serem adultos conscientes, acerca das suas finanças.",
                "video": "url.com.br",
                "data_init": "01.10.2022",
                "data_end": "05.11.2022"
            }

            const classe = new Classe(newClass);
            const result = await classe.save();

            const newComment = {
                "id_class": result._id,
                "comment": "Ótima aula!!!",
                "date_created": result.date_created
            };

            const response = await global.testRequest.post('/classes/comments').set({ 'Authorization': `Bearer ${token}` }).send(newComment);

            expect(response.status).toBe(201);
            expect(response.body.comment).toEqual(newComment.comment);
            expect(response.body.id_class).toStrictEqual(newComment.id_class.toString());
        });

        it('Should return a validation error when try created with a not existing id class', async () => {
            const newComment = {
                "id_class": '61ed8e61a0dbe045222194b8',
                "comment": "Ótima aula!!!"
            };

            const response = await global.testRequest.post('/classes/comments').set({ 'Authorization': `Bearer ${token}` }).send(newComment);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                code: 400,
                error: 'Classe not found, comments is not created, please enter a existing id Classe.',
            });
        });

        it('Should return 422 when the field comment is was not inserted', async () => {

            const newClass = {
                "name": "Classe de Finanças",
                "description": "Aula com o objetivo de ensinar crianças pequenas a serem adultos conscientes, acerca das suas finanças.",
                "video": "url.com.br",
                "data_init": "01.10.2022",
                "data_end": "05.11.2022"
            }

            const classe = new Classe(newClass);
            const result = await classe.save();

            const newComment = {
                "id_class": result._id
            };

            const response = await global.testRequest.post('/classes/comments').set({ 'Authorization': `Bearer ${token}` }).send(newComment);

            expect(response.status).toBe(422);
            expect(response.body).toEqual({
                code: 422,
                error: 'Comments validation failed: comment: Path `comment` is required.'
            });
        });
    });

    describe('When get all comments', () => {
        it('should return all comments existing', async () => {
            const newClass = {
                "name": "Classe de Finanças",
                "description": "Aula com o objetivo de ensinar crianças pequenas a serem adultos conscientes, acerca das suas finanças.",
                "video": "url.com.br",
                "data_init": "01.10.2022",
                "data_end": "05.11.2022"
            }

            const classe = new Classe(newClass);
            const classeNew = await classe.save();

            const newComment = {
                "id_class": classeNew._id,
                "comment": "Ótima aula!!!",
                "date_created": classeNew.date_created
            };

            const newComment2 = {
                "id_class": classeNew._id,
                "comment": "Aula essencial para os estudos!!!",
                "date_created": classeNew.date_created
            };


            const comment1 = await global.testRequest.post('/classes/comments').set({ 'Authorization': `Bearer ${token}` }).send(newComment);
            const comment2 = await global.testRequest.post('/classes/comments').set({ 'Authorization': `Bearer ${token}` }).send(newComment2);

            const response = await global.testRequest.get('/classes/comments/all').set({ 'Authorization': `Bearer ${token}` });

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toEqual(comment1.body);
            expect(response.body[1]).toEqual(comment2.body);
        });
    });
});