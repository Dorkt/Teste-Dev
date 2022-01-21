import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '@src/database/models/users';
import { usersClients } from '@src/clients/users';

@Controller('users')
export class TeacherController {
  @Post('/')
  public async loginUser(req: Request, res: Response): Promise<void> {
    const login: string = req.body.login;
    const password: string = req.body.password;

    const user = new User(req.body);
    const result = await user.save();
    res.status(201).send(result);
  }

  @Post('/')
  public async login

}
