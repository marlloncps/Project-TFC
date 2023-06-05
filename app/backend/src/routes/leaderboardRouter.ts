import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardControllers';

const lbRouter = Router();

const lbController = new LeaderBoardController();

lbRouter.get('/home', lbController.lbHome);
lbRouter.get('/away', lbController.lbAway);
lbRouter.get('/', lbController.leaderboard);

export default lbRouter;
