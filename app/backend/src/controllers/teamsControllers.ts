import { Request, Response } from 'express';
import TeamService from '../services/teamsServices';

class TeamController {
  private service = new TeamService();

  public getAll = async (req: Request, res: Response) => {
    const teams = await this.service.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamId = await this.service.getById(id);
    if (!teamId || teamId == null) {
      return res.status(404).json({ message: 'Não existe time com esse id' });
    }
    return res.status(200).json(teamId);
  };
}

export default TeamController;
