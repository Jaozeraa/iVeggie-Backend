import { ICreateDishesDTO } from '../dtos/ICreateDishesDTO';
import { Dish } from '../infra/prisma/entities/Dish';

export interface IDishesRepository {
  create(payload: ICreateDishesDTO): Promise<Dish>;
  findById(id: string): Promise<Dish | null>;
  getAllDishesFromRestaurantExceptOne(
    exceptDishId: string,
    restaurantId: string,
  ): Promise<Dish[]>;
  findOne(props: Partial<Dish>): Promise<Dish | null>;
}
