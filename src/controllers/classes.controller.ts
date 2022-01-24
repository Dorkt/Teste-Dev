import { ClassMiddleware, Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Classe } from '@src/database/models/classes';
import { BaseController } from '.';
import { Comments } from '@src/database/models/comments';
import { TokenValidation } from '../../middlewares/auth';


@Controller('classes')
@ClassMiddleware(TokenValidation)
export class ClassesController extends BaseController {
  @Get('')
  public async getAllClasses(req: Request, res: Response): Promise<void> {
    try {
      const classes = await Classe.find();

      const promiseClasses = classes.map(async (classe) => {

        const comment = await Comments.find({ id_class: classe._id}).limit(1).sort({ $natural: -1 });

        const classeMoreComments = {
          '_id': classe._id,
          'name': classe.name,
          'description': classe.description,
          'video': classe.video,
          'data_init': classe.data_init,
          'data_end': classe.data_end,
          'date_created': classe.date_created,
          'date_updated': classe.date_updated,
          'total_comments': classe.total_comments,
          'last_comment': comment[0]?.comment,
          'last_comment_date': comment[0]?.created_at
        }
        
        return classeMoreComments;
      })

      const classesWithLastComments = await Promise.all(promiseClasses)

      res.status(200).send(classesWithLastComments)
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get(':id')
  public async getByIdClasse(req: Request, res: Response): Promise<void> {
    try {
      const classe = await Classe.findById(req.params.id)

      res.status(200).send(classe);
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Post('/')
  public async postNewClasse(req: Request, res: Response): Promise<void> {
    try {
      const classe = new Classe(req.body);
      const result = await classe.save();
      res.status(201).send(result);
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Put(':id')
  public async putExistingClasse(req: Request, res: Response): Promise<void> {
    try {
      const classe = await Classe.findById(req.params.id)
      if (!classe) {
        res.status(400).send({
          code: 400,
          message: 'Not found the class, please enter a correctly id!'
        })
      }

      if (req.body.total_comments || req.body.date_created || req.body.date_updated || req.body._id) {
        res.status(400).send({
          code: 400,
          message: 'It is not possible to change some field of the value, please remove this field and try again! ' +
            'The fields that have permissions: "name", "description", "video", "data_init", "data_end"'
        })
      }

      const updateData = {
        name: req.body.name ? req.body.name : classe?.name,
        description: req.body.description ? req.body.description : classe?.description,
        video: req.body.video ? req.body.video : classe?.video,
        data_init: req.body.data_init ? req.body.data_init : classe?.data_init,
        data_end: req.body.data_end ? req.body.data_end : classe?.data_end,
      }

      await Classe.findByIdAndUpdate(classe, { $set: updateData }, { new: true });

      res.status(200).send('Updated');
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Delete(':id')
  public async deleteClasse(req: Request, res: Response): Promise<void> {
    try {
      const classe = await Classe.findById(req.params.id)
      
      if(!classe) {
        res.status(400).send({
          code: 400,
          error: 'Classe not found, please enter a existing id.'
        })
      }

      await Classe.deleteOne({ _id: classe?.id });

      await Comments.deleteMany({ id_class: classe?._id })
      
      res.status(200).send({message: 'Classe remove successfully'})
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }


  // Routes for comments
  @Post('comments')
  public async createComment(req: Request, res: Response): Promise<Response | void> {
    try {
      const classe: any = await Classe.findOne({ _id: req.body.id_class })

      if(!classe) {
        return res.status(400).send({
          code: 400,
          error: 'Classe not found, comments is not created, please enter a existing id Classe.'
        })
      }
      
      const newComment = new Comments();
      newComment.id_class = req.body.id_class;
      newComment.comment = req.body.comment;
      newComment.date_created = classe.date_created;

      const comments = new Comments(newComment);
      const result = await comments.save();

      const valueComments = classe.total_comments + 1
      await Classe.findOneAndUpdate({ _id: req.body.id_class }, { total_comments: valueComments } );

      return res.status(201).send(result);
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('comments/all')
  public async getAllComments(req: Request, res: Response): Promise<void> {
    const comments = await Comments.find()

    res.status(200).send(comments);
  }

  @Get('comments/byclasse/:idclasse')
  public async getCommentsSomeClasse(req: Request, res: Response): Promise<void> {
    try {
      const comments = await Comments.find({ id_class: req.params.idclasse })

      res.status(200).send(comments);
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }

  }

  @Delete('comments/:id')
  public async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const comments = await Comments.findById(req.params.id)
      
      if(!comments) {
        res.status(400).send({
          code: 400,
          error: 'Comment not found, please enter a existing id of comment.'
        })
      }

      await Comments.deleteOne({ _id: comments?.id });

      const classe: any = await Classe.findOne({ _id: comments?.id_class });
      const valueComments = classe.total_comments - 1;

      await Classe.findOneAndUpdate({ _id: classe._id }, { total_comments: valueComments } );
      
      res.status(200).send({message: 'Comment remove successfully'})
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
