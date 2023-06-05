import { Router } from 'express';
import LoginController from '../controllers/loginControllers';
import LoginMiddle from '../middlewares/LoginValidate';

const loginController = new LoginController();
const loginValidate = new LoginMiddle();
const loginRouter = Router();

loginRouter.post('/', loginValidate.validate, loginController.tryLogin);
loginRouter.get('/validate', loginValidate.verifyAuthorization, loginController.tryValidate);

export default loginRouter;
