import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionsService = new CreateTransactionService(
  transactionsRepository,
);
const getTransactionsService = new GetTransactionsService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = getTransactionsService.execute();
    return response.status(200).json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction = createTransactionsService.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
