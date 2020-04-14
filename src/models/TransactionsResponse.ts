import Transaction from './Transaction';
import Balance from './Balance';

class TransactionsReponse {
  public transactions: Transaction[];

  public balance: Balance;

  constructor({ transactions, balance }: TransactionsReponse) {
    this.transactions = transactions;
    this.balance = balance;
  }
}

export default TransactionsReponse;
