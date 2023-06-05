import TeamsModel from '../database/models/Teams';
import { iTeam } from '../interfaces';

class TeamService {
  getAll = async (): Promise<iTeam[]> => {
    const teams = await TeamsModel.findAll();
    return teams;
  };

  getById = async (id:string) => {
    const idTeam = await TeamsModel.findOne({ where: { id } });
    if (!idTeam) {
      return null;
    }
    return idTeam;
  };
}
export default TeamService;
