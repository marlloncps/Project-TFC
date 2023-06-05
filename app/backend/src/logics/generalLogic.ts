/* eslint-disable no-param-reassign */

const totalGames = (team: any) => team.length;

const totalVictories = (team: any, id: number) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) {
      acc += 1;
    }
    if (match.awayTeam === id && match.homeTeamGoals < match.awayTeamGoals) {
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

const totalLosses = (team: any, id: number) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals) {
      acc += 1;
    }
    if (match.awayTeam === id && match.homeTeamGoals > match.awayTeamGoals) {
      acc += 1;
    }
    return acc;
  }, 0);
  return result;
};

const totalPoints = (team: any, id: number) => {
  const victories = totalVictories(team, id) * 3;
  const draws = totalDraws(team);
  return victories + draws;
};

const goalsFavor = (team: any, id: number) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.homeTeam === id) {
      acc += match.homeTeamGoals;
    }
    if (match.awayTeam === id) {
      acc += match.awayTeamGoals;
    }
    return acc;
  }, 0);
  return result;
};

const goalsOwn = (team: any, id: number) => {
  const result = team.reduce((acc: number, match: any) => {
    if (match.awayTeam === id) {
      acc += match.homeTeamGoals;
    }
    if (match.homeTeam === id) {
      acc += match.awayTeamGoals;
    }
    return acc;
  }, 0);
  return result;
};

const goalsBalance = (team: any, id: number) => goalsFavor(team, id) - goalsOwn(team, id);

const efficiency = (team: any, id: number) => {
  const total = totalGames(team) * 3;
  const points = totalPoints(team, id);
  const result = (100 / total) * points;
  return result.toFixed(2);
};

const teamName = (team: any) => team[0].teamName;

const generalTeams = (allMatches: any, allTeams: any) => {
  const response = [];
  for (let i = 1; i <= 16; i += 1) {
    const suport = allMatches
      .filter((match: any) => match.homeTeam === i || match.awayTeam === i);
    const teamObject = allTeams.filter((team: any) => team.id === i);

    response.push({ name: teamName(teamObject),
      totalPoints: totalPoints(suport, i),
      totalGames: totalGames(suport),
      totalVictories: totalVictories(suport, i),
      totalDraws: totalDraws(suport),
      totalLosses: totalLosses(suport, i),
      goalsFavor: goalsFavor(suport, i),
      goalsOwn: goalsOwn(suport, i),
      goalsBalance: goalsBalance(suport, i),
      efficiency: efficiency(suport, i),
    });
  }
  return response;
};

export default generalTeams;
