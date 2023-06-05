/* eslint-disable no-param-reassign */
const totalGames = (team: any) => team.length;

const totalVictories = (team: any) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      acc += 1;
    }
    return acc;
  }, 0);
  return result;
};

const totalDraws = (team: any) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      acc += 1;
    }
    return acc;
  }, 0);
  return result;
};

const totalLosses = (team: any) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      acc += 1;
    }
    return acc;
  }, 0);
  return result;
};

const totalPoints = (team: any) => {
  const victories = totalVictories(team) * 3;
  const draws = totalDraws(team);
  return victories + draws;
};

const goalsFavor = (team: any) => {
  const result = team.reduce((acc: number, match: any) => {
    acc += match.homeTeamGoals;
    return acc;
  }, 0);
  return result;
};

const goalsOwn = (team: any) => {
  const result = team.reduce((acc: number, match: any) => {
    acc += match.awayTeamGoals;
    return acc;
  }, 0);
  return result;
};

const goalsBalance = (team: any) => goalsFavor(team) - goalsOwn(team);

const efficiency = (team: any) => {
  const total = totalGames(team) * 3;
  const points = totalPoints(team);
  const result = (100 / total) * points;
  return result.toFixed(2);
};

const teamName = (team: any) => team[0].teamName;

const homeTeams = (allMatches: any, allTeams: any) => {
  const response = [];
  for (let i = 1; i <= 16; i += 1) {
    const suport = allMatches.filter((match: any) => match.homeTeam === i);
    const teamObject = allTeams.filter((team: any) => team.id === i);

    response.push({
      name: teamName(teamObject),
      totalPoints: totalPoints(suport),
      totalGames: totalGames(suport),
      totalVictories: totalVictories(suport),
      totalDraws: totalDraws(suport),
      totalLosses: totalLosses(suport),
      goalsFavor: goalsFavor(suport),
      goalsOwn: goalsOwn(suport),
      goalsBalance: goalsBalance(suport),
      efficiency: efficiency(suport),
    });
  }
  return response;
};

export default homeTeams;
