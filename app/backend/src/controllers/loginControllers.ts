import { Request, Response } from 'express';
import LoginMiddle from '../middlewares/LoginValidate';
import LoginService from '../services/loginServices';

const loginValidate = new LoginMiddle();

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public tryLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userToken = await this.service.getLogin(email, password);
    if (!userToken) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const { id, username, role } = userToken;
    const token = loginValidate.createToken({ id, username, role });
    return res.status(200).json({ token });
  };

  public tryValidate = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    return res.status(200).json({ role });
  };
}
