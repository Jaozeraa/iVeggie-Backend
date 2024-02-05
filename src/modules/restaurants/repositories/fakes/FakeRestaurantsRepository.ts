import { v4 as uuid } from 'uuid';
import { IRestaurantsRepository } from '../IRestaurantsRepository';
import { ICreateRestaurantDTO } from '@modules/restaurants/dtos/ICreateRestaurantDTO';
import { Restaurant } from '@modules/restaurants/infra/prisma/entities/Restaurant';

export class FakeRestaurantsRepository implements IRestaurantsRepository {
  private restaurants: Restaurant[] = [];
  public async create({
    name,
    address,
    image,
    phoneNumber,
    wallpaper,
  }: ICreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = {} as Restaurant;

    Object.assign(restaurant, {
      id: uuid(),
      name,
      address,
      image,
      phoneNumber,
      wallpaper,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    this.restaurants.unshift(restaurant);

    return restaurant;
  }

  public async findById(id: string): Promise<Restaurant | null> {
    const restaurant = this.restaurants.find(
      findRestaurant => findRestaurant.id === id,
    );

    return restaurant || null;
  }

  public async findAll(): Promise<Restaurant[]> {
    const restaurants = this.restaurants;

    return restaurants;
  }

  public async findOne(props: Partial<Restaurant>): Promise<Restaurant | null> {
    const restaurant = this.restaurants.find(findRestaurant => {
      return Object.entries(props).every(
        ([key, value]) => findRestaurant[key as keyof Restaurant] === value,
      );
    });

    return restaurant || null;
  }

  public async search(payload: string): Promise<Restaurant[]> {
    const restaurants = this.restaurants;

    return restaurants;
  }
}
