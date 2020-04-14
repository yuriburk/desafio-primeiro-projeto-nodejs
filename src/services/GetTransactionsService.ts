import TransactionsRepository from '../repositories/TransactionsRepository';
import TransactionsResponse from '../models/TransactionsResponse';

class GetTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionsResponse {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    const transactionsResponse = new TransactionsResponse({
      transactions,
      balance,
    });

    return transactionsResponse;
  }
}

export default GetTransactionsService;
