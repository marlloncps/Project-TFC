import { Request, Response } from 'express';
import TeamService from '../services/teamsServices';
import Matches from '../database/models/Matches';
import MatcheService from '../services/matchsServices';

export default class MatcheController {
  private matchService: MatcheService;
  private teamService: TeamService;
  private response: Matches[];
  constructor() {
    this.matchService = new MatcheService();
    this.teamService = new TeamService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    this.response = await this.matchService.getAll();
    if (inProgress) {
      const isProgress = inProgress === 'true';
      this.response = await this.matchService.getDones(isProgress);
    }
    return res.status(200).json(this.response);
  };

  public postMatch = async (req: Request, res: Response) => {
    const match = req.body;
    const homeTeam = await this.teamService.getById(match.homeTeam);
    const outTeam = await this.teamService.getById(match.awayTeam);
    if (homeTeam == null || outTeam == null || !homeTeam || !outTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (match.homeTeam === match.awayTeam) {
      return res
        .status(422)
        .json({
          message: 'It is not possible to create a match with two equal teams',
        });
    }
    const matchMade = await this.matchService.postMatch(match);
    return res.status(201).json(matchMade);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.finishMatch(id);
    return res.status(200).json({ message: 'Finalizado!' });
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatches(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Partida atualizada com sucesso!' });
  };
}
