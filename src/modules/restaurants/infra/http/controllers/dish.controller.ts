import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDishService } from '@modules/restaurants/services/CreateDishService';
import { ListDishDetailsService } from '@modules/restaurants/services/ListDishDetailsService';
import {
  formatDish,
  formatDishes,
} from '@modules/restaurants/utils/formatDish';

export class DishesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, resume, price } = request.body;
    const { restaurantId } = request.params;
    const createDish = container.resolve(CreateDishService);
    const { filename = '' } = request.file || {};

    const dish = await createDish.execute({
      name,
      imageFilename: filename,
      description,
      price,
      resume,
      restaurantId,
    });

    return response.json(dish);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listDishDetails = container.resolve(ListDishDetailsService);

    const { dish, suggestedDishes } = await listDishDetails.execute(id);

    return response.json({
      dish: formatDish(dish),
      suggestedDishes: formatDishes(suggestedDishes),
    });
  }
}
