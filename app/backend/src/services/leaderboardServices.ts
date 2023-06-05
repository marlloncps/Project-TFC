import MatchModel from '../database/models/Matches';

class LbService {
  getAll = async () => {
    const matches = await MatchModel.findAll(
      { where: { inProgress: false } },
    );
    return matches;
  };
}

export default LbService;
