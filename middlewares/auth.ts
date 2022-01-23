import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
}

export function TokenValidation(req: Request, res: Response, next: NextFunction): void {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'Token não encontrado'
        })

        const tk = token?.split(' ')[1]

        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        jwt.verify(tk ? tk : '', token_secret) as IPayload

        next()
    } catch (error: any) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}