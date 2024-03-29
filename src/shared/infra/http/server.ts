import 'reflect-metadata';
import 'dotenv/config';

import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(Number(err.statusCode))
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}! 🚀`);
});
