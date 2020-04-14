import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = new Balance({
      income: 0,
      outcome: 0,
      total: 0,
    });
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance.outcome = this.getOutcomeOrIncomeValue('outcome');
    this.balance.income = this.getOutcomeOrIncomeValue('income');
    this.balance.total = this.balance.income - this.balance.outcome;
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);
    return transaction;
  }

  private getOutcomeOrIncomeValue(type: 'outcome' | 'income'): number {
    const initialValue = 0;
    return this.transactions
      .filter(t => t.type === type)
      .reduce((accumulator, currentTransaction) => {
        const result = accumulator + currentTransaction.value;
        return result;
      }, initialValue);
  }
}

export default TransactionsRepository;
