import { injectable, inject } from 'tsyringe';

import { IRestaurantsRepository } from '../repositories/IRestaurantsRepository';
import { AppError } from '@shared/errors/AppError';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

@injectable()
export class ListRestaurantDetailsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  async execute(id: string) {
    const restaurant = await this.restaurantsRepository.findById(id);
    if (!restaurant) {
      throw new AppError(ErrorsEnum.restaurantNotFound);
    }

    return restaurant;
  }
}
