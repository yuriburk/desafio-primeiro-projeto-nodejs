import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw Error(
        'It is not possible to do a outcome higher than total balance',
      );
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
