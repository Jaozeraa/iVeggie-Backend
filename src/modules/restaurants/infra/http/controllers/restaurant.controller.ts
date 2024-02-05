import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRestaurantService } from '@modules/restaurants/services/CreateRestaurantService';
import { FindRestaurantsService } from '@modules/restaurants/services/FindRestaurantsService';
import {
  formatRestaurant,
  formatRestaurants,
} from '@modules/restaurants/utils/formatRestaurant';
import { ListRestaurantDetailsService } from '@modules/restaurants/services/ListRestaurantDetailsService';

export class RestaurantsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phoneNumber, address } = request.body;
    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      imageFilename: (request.files as any).image[0].filename,
      wallpaperFilename: (request.files as any).wallpaper[0].filename,
      phoneNumber,
      address,
    });

    return response.json(formatRestaurant(restaurant));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { payload } = request.query;
    const findRestaurants = container.resolve(FindRestaurantsService);

    const restaurants = await findRestaurants.execute({
      payload: String(payload || ''),
    });

    return response.json(formatRestaurants(restaurants));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listRestaurantDetails = container.resolve(
      ListRestaurantDetailsService,
    );

    const restaurant = await listRestaurantDetails.execute(id);

    return response.json(formatRestaurant(restaurant));
  }
}
