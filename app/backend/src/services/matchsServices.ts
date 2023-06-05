import iMatches from '../interfaces';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatcheService {
  getAll = async () => {
    const allMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  getDones = async (inProgress: boolean) => {
    const allDones = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allDones;
  };

  postMatch = async (infos: iMatches) => {
    const match = await Matches.create({ ...infos, inProgress: true });
    return match;
  };

  finishMatch = async (id: string) => {
    const finishMatch = await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
    return finishMatch;
  };

  updateMatches = async (id: string, homeGoals: number, awayGoals: number) => {
    const matchUpdated = await Matches.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id } },
    );
    return matchUpdated;
  };
}
