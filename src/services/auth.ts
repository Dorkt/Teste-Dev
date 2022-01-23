import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthService {

    public static async hashPassword(
        password: string,
        salt = 10
    ): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
    
    public static async validatePassword(password: string, hashedPassword: string): Promise<boolean | void> {
        if (!password) {
            return false;
        } else {
            return bcrypt.compare(password, hashedPassword);
        }
    }

    public static generateToken(payload: Record<string, unknown>): string {
        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
        const token_expires: string = process.env.TOKEN_EXPIRES ? process.env.TOKEN_EXPIRES : '';

        return jwt.sign(payload, token_secret, {
          expiresIn: token_expires,
        });
    }
} 
