import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { routes } from './routes';
import '@shared/containers';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}! 🚀`);
});
