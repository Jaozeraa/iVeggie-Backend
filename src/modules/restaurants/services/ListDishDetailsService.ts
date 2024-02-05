import { injectable, inject } from 'tsyringe';

import { IDishesRepository } from '../repositories/IDishesRepository';
import { AppError } from '@shared/errors/AppError';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

@injectable()
export class ListDishDetailsService {
  constructor(
    @inject('DishesRepository')
    private dishesRepository: IDishesRepository,
  ) {}

  async execute(id: string) {
    const dish = await this.dishesRepository.findById(id);
    if (!dish) {
      throw new AppError(ErrorsEnum.dishNotFound);
    }
    const suggestedDishes =
      await this.dishesRepository.getAllDishesFromRestaurantExceptOne(
        id,
        dish.restaurantId,
      );

    return { dish, suggestedDishes };
  }
}
