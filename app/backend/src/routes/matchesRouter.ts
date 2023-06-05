import { Router } from 'express';
import MatcheController from '../controllers/matchsControllers';
import LoginMiddle from '../middlewares/LoginValidate';

const matchesController = new MatcheController();
const loginValidate = new LoginMiddle();
const matcheRouter = Router();

matcheRouter.get('/', matchesController.getAll);
matcheRouter.post('/', loginValidate.verifyAuthorization, matchesController.postMatch);
matcheRouter.patch('/:id/finish', matchesController.finishMatch);
matcheRouter.patch('/:id', matchesController.updateMatches);

export default matcheRouter;
