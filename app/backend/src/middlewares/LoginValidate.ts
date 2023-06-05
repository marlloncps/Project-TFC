import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

const verifyEmail = (email: string): boolean => {
  const emailReg = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gim;
  const teste = emailReg.test(email);
  if (!teste) return false;
  return true;
};

export default class LoginMiddle {
  public validate = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!verifyEmail(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (password.length < 6) {
      return res.status(422).json({
        messsage: '"password" length must be at least 6 characters long',
      });
    }
    next();
  };

  public createToken = (payload: object): string => {
    const token = jwt.sign(payload, secret);
    return token;
  };

  public verifyAuthorization = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.header('Authorization');
      if (!token) return res.status(401).json({ message: 'Token not found' });
      const isValid = jwt.verify(token, secret) as jwt.JwtPayload;
      if (!isValid) return res.status(401).json({ message: 'Token must be a valid token' });
      req.body.user = isValid;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
