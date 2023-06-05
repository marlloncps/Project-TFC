import { Request, Response } from 'express';
import Utils from '../utils';
import LbService from '../services/leaderboardServices';
import TeamService from '../services/teamsServices';
import homeTeams from '../logics/logicHome';
import awayTeams from '../logics/logicAway';
import generalTeams from '../logics/generalLogic';

class LbController {
  private service: LbService;
  private serviceTeams: TeamService;
  private utils: Utils;

  constructor() {
    this.service = new LbService();
    this.serviceTeams = new TeamService();
    this.utils = new Utils();
  }

  public lbHome = async (req: Request, res: Response) => {
    const matches = await this.service.getAll();
    const teams = await this.serviceTeams.getAll();
    const response = this.utils.lbOrganize(homeTeams(matches, teams));
    return res.status(200).json(response);
  };

  public lbAway = async (req: Request, res: Response) => {
    const matches = await this.service.getAll();
    const teams = await this.serviceTeams.getAll();
    const response = this.utils.lbOrganize(awayTeams(matches, teams));
    return res.status(200).json(response);
  };

  public leaderboard = async (req: Request, res: Response) => {
    const matches = await this.service.getAll();
    const teams = await this.serviceTeams.getAll();
    const response = this.utils.lbOrganize(generalTeams(matches, teams));
    return res.status(200).json(response);
  };
}

export default LbController;
