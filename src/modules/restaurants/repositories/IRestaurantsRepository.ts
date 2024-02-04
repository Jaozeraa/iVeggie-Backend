import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import { Restaurant } from '../infra/prisma/entities/Restaurant';

export default interface IRestaurantsRepository {
  create(payload: ICreateRestaurantDTO): Promise<Restaurant>;
  findById(id: string): Promise<Restaurant | null>;
}
