import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import RestaurantsController from '../controllers/restaurant.controller';

const restaurantRouter = Router();

const restaurantController = new RestaurantsController();

restaurantRouter.post(
  '/',
  validateRequest({
    body: z.object({
      name: z.string().min(1),
      address: z.string().min(1),
      phoneNumber: z.string().min(1),
      image: z.string().min(1),
      wallpaper: z.string().min(1),
    }),
  }),
  restaurantController.create,
);

export { restaurantRouter };
