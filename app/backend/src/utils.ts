export default class Utils {
  public lbOrganize = (lb: any) => {
    const response = lb.sort(
      (a: any, b: any) => {
        if (a.totalPoints === b.totalPoints
          && a.goalsBalance === b.goalsBalance && a.goalsFavor === b.goalsFavor) {
          return a.goalsOwn > b.goalsOwn ? 1 : -1;
        }
        if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
          return a.goalsFavor < b.goalsFavor ? 1 : -1;
        }
        if (a.totalPoints === b.totalPoints) {
          return a.goalsBalance < b.goalsBalance ? 1 : -1;
        }
        return a.totalPoints < b.totalPoints ? 1 : -1;
      },
    );
    return response;
  };
}
