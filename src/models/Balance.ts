class Balance {
  public income: number;

  public outcome: number;

  public total: number;

  constructor({ income, outcome, total }: Balance) {
    this.income = income;
    this.outcome = outcome;
    this.total = total;
  }
}

export default Balance;
