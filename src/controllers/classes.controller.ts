import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Classe } from '@src/database/models/classes';


@Controller('classes')
export class ClassesController {
  @Get('/')
  public async getAllClasses(req: Request, res: Response): Promise<void> {
    try {
      const classes = await Classe.find({});
      console.log(classes);
      res.status(200).send(classes)
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }

  @Get('/:id')
  public async getByIdClasse(req: Request, res: Response): Promise<void> {
    try {
      const classe = await Classe.findById(req.params.id)
      console.log(req.params.id);

      res.status(200).send(classe);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }

  @Post('/')
  public async postNewClasse(req: Request, res: Response): Promise<void> {
    const classe = new Classe(req.body);
    const result = await classe.save();
    res.status(201).send(result);
  }

  @Put('/:id')
  public async putExistingClasse(req: Request, res: Response): Promise<void> {

  }

  @Delete('/:id')
  public async deleteClasse(req: Request, res: Response): Promise<void> {

  }

  @Post('/comments')
  public async createComment(req: Request, res: Response): Promise<void> {

  }

  @Get('/comments')
  public async getAllComments(req: Request, res: Response): Promise<void> {

  }

  @Delete('/comments/:id')
  public async deleteComment(req: Request, res: Response): Promise<void> {

  }
}
