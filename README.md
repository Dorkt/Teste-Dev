
# Teste Dev

**Contato:**

- Email: Gabrieldorkt@gmail.com

- Fone: (81) 9 9262-2663

- Linkedin: linkedin.com/in/gabriel-duque-aba0891a3/

## Descrição Projeto:

Eu optei por seguir o padrão de desenvolvimento do curso do youtube ministrado pelo "Waldemar Neto", principalmente pela familiaridade que o pacote que ele usa para trabalhar com rotas o "overnightjs", em vista que se assemelha muito ao pacote que eu trabalho no meu estágio que é o "inversify-express", onde trabalho com uma infraestrutura de microsserviços.

### Models
Na parte dos modelos, eu optei por usar algumas ferramentas do mongoose, analisando formas de deixar algumas variáveis com valores automáticos, a exemplo o modelo de classes, onde optei por deixar campos como "date_created" e "date_updated", com a lógica de timestamps que funcionou perfeitamente.

No modelo de comentários, precisei adicionar uma variável por padrão, o "created_at", pois precisei da mesma para ser retornada junto da classe (em uma rota de classes), com a data / horário que foi criado o último comentário sobre aquela determinada aula.

No modelo de User apenas adicionei uma validação para emails, pois optei por criar a rota de criação de usuários no banco.

### Controllers
Optei por criar um controller base, intitulado "index.ts", pois ele tratava para os 2 controllers de erros específicos do mongo.

No controller de classes, optei por criar as rotas de comentários nesse controller tbm, pois usaria a base '/classes' na rota.

Falando sobre as rotas ligadas diretamente as classes, o mais diferente que apliquei de lógica foi o fato de permitir que apenas algumas informações pudessem ser alteradas na rota "put", de modificação, pois não fazia sentido mudar campos que são definidos por timestamps por exemplo. E também acrescentei que quando fosse deletado uma classe, todos os seus comentários também fossem deletados, como se os comentários estivessem entrelaçados aquela determinada classe.

Em rotas ligadas diretamente aos comentários, optei por fazer duas rotas de busca, e optei por modificar a que está no documento em que era apenas "/classes/comments", adicionei o "/all", no fim dessa rota para retornar todos os comentários existentes, e para comentários específicos de determinada aula, criei a rota "comments/:id", assim passando o id no "params", é possível encontrar comentários de apenas determinada aula.

### Informações adicionais 

Optei pelo uso da biblioteca jsobWebToken para poder validar as autenticações de acesso.

Usei de docker-compose, para facilitar a inicialização do mongodb, você pode acessar a rota local com a url "mongodb://localhost:27017/teste-dev".

Usei da biblioteca dotenv para aplicar variáveis de ambientes, o arquivo está no repositório como .env.example, só retirar o .example para que seja reconhecido as variáveis de ambiente.

Usei de jest para os teste.

### Aplicação em produção

Como tenho aptidão com o uso de heroku para colocar aplicações em produção, eu escolheria essa ferramenta para por meu serviço em produção.

Criaria a instância do heroku no projeto usando "heroku create", e trabalharia em cima do git para poder sempre fazer atualizações futuras na produção, usando de novos pushs na branch master do meu projeto, para a cada novo push ocorrer um novo deploy do sistema no heroku.

### Considerações finais
(Tempo de entrega do projeto = 2 dias)
Foi incrível participar do teste, me esforcei ao máximo para entregar o que foi possível fazer no tempo livre que tive. Agradeço pela oportunidade, e gostaria de dizer que sou uma pessoa que está disposta a sempre aprender mais e mais.
