import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { User } from '@src/database/models/users';
import { BaseController } from '.';
import AuthService from '@src/services/auth'; 

@Controller('users')
export class UsersController extends BaseController {
  @Post('created')
  public async createdUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error: any) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
  
  @Post('/')
  public async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    
    if (!user) {
      return res.status(401).send({
        code: 401,
        message: 'User not found!',
        description: 'Try verifying your email address.'
      })
    }

    if(user) {
      if (!(await AuthService.validatePassword(password, user?.password))) {
  
        return res.status(401).send({
          code: 401,
          error: 'Password does not match, please try again.'
        })
      }
    }

    let token: string = '';
    if (user) {
      token = AuthService.generateToken(user?.toJSON());
    }

    return res.status(201).send({ ...user?.toJSON(), ...{ token } });
  }
}
