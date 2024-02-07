import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { RestaurantsController } from '../controllers/restaurant.controller';
import { DishesController } from '../controllers/dish.controller';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import multer from 'multer';
import uploadConfig from '@config/upload';

const restaurantRouter = Router();
restaurantRouter.use(ensureAuthenticated);
const upload = multer(uploadConfig.multer);

const restaurantController = new RestaurantsController();
const dishesController = new DishesController();

restaurantRouter.post(
  '/',
  validateRequest({
    body: z.object({
      name: z.any(),
      address: z.any(),
      phoneNumber: z.any(),
      image: z.any(),
      wallpaper: z.any(),
      latitude: z.any(),
      longitude: z.any(),
    }),
  }),
  upload.fields([{ name: 'image' }, { name: 'wallpaper' }]),
  restaurantController.create,
);

restaurantRouter.get('/', restaurantController.index);

restaurantRouter.get('/:id', restaurantController.show);

restaurantRouter.post(
  '/dishes/:restaurantId',
  validateRequest({
    body: z.object({
      name: z.any(),
      price: z.any(),
      description: z.any(),
      resume: z.any(),
      image: z.any(),
    }),
  }),
  upload.single('image'),
  dishesController.create,
);

restaurantRouter.get(
  '/dishes/:id',
  validateRequest({
    params: z.object({
      id: z.any(),
    }),
  }),
  dishesController.show,
);

export { restaurantRouter };
