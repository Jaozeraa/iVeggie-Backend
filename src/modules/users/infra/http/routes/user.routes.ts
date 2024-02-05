import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { UsersController } from '../controllers/user.controller';
import { SessionsController } from '../controllers/session.controller';
import ResetPasswordController from '../controllers/resetPassword.controller';
import { ForgotPasswordController } from '../controllers/forgotPassword.controller';

const userRouter = Router();

const userController = new UsersController();
const sessionsController = new SessionsController();

const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

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

userRouter.post(
  '/sessions',
  validateRequest({
    body: z.object({
      email: z.string().email().min(1),
      password: z.string().min(1),
    }),
  }),
  sessionsController.create,
);

userRouter.put(
  '/sessions',
  validateRequest({
    body: z.object({
      refreshToken: z.string().min(1),
    }),
  }),
  sessionsController.update,
);

userRouter.post(
  '/password/forgot',
  validateRequest({
    body: z.object({
      email: z.string().email().min(1),
    }),
  }),
  forgotPasswordController.create,
);

userRouter.post(
  '/password/reset',
  validateRequest({
    body: z.object({
      pin: z.string().min(1),
      password: z.string().min(1),
    }),
  }),
  resetPasswordController.create,
);

export { userRouter };
