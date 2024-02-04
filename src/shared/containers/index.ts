import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';

import { IRestaurantsRepository } from '@modules/restaurants/repositories/IRestaurantsRepository';
import { RestaurantsRepository } from '@modules/restaurants/infra/prisma/repositories/RestaurantsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);
