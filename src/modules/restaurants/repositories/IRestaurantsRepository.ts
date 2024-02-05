import { ICreateRestaurantDTO } from '../dtos/ICreateRestaurantDTO';
import { Restaurant } from '../infra/prisma/entities/Restaurant';

export interface IRestaurantsRepository {
  create(payload: ICreateRestaurantDTO): Promise<Restaurant>;
  findById(id: string): Promise<Restaurant | null>;
  findAll(): Promise<Restaurant[]>;
  findOne(props: Partial<Restaurant>): Promise<Restaurant | null>;
  search(payload: string): Promise<Restaurant[]>;
}
