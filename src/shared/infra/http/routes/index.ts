import { Router } from 'express';
import { userRouter } from '@modules/users/infra/http/routes/user.routes';
import { restaurantRouter } from '@modules/restaurants/infra/http/routes/restaurant.routes';

const routes = Router();

routes.use('/users', userRouter);

routes.use('/restaurants', restaurantRouter);

export { routes };
