import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRestaurantService } from '@modules/restaurants/services/CreateRestaurant.service';

export default class RestaurantsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, image, wallpaper, phoneNumber, address } = request.body;
    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      image,
      wallpaper,
      phoneNumber,
      address,
    });

    return response.json(restaurant);
  }
}
