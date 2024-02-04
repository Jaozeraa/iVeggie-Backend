import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { UsersController } from '../controllers/user.controller';

const userRouter = Router();

const userController = new UsersController();

userRouter.post(
  '/',
  validateRequest({
    body: z.object({
      email: z.string().email().min(1),
      password: z.string().min(1),
      name: z.string().min(1),
    }),
  }),
  userController.create,
);

export { userRouter };
