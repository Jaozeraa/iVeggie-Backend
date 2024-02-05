import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { UserTokensRepository } from '@modules/users/infra/prisma/repositories/UserTokensRepository';

import { IRestaurantsRepository } from '@modules/restaurants/repositories/IRestaurantsRepository';
import { RestaurantsRepository } from '@modules/restaurants/infra/prisma/repositories/RestaurantsRepository';

import { IDishesRepository } from '@modules/restaurants/repositories/IDishesRepository';
import { DishesRepository } from '@modules/restaurants/infra/prisma/repositories/DishesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<IDishesRepository>(
  'DishesRepository',
  DishesRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
