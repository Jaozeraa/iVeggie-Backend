import { v4 as uuid } from 'uuid';
import { IDishesRepository } from '../IDishesRepository';
import { ICreateDishesDTO } from '@modules/restaurants/dtos/ICreateDishesDTO';
import { Dish } from '@modules/restaurants/infra/prisma/entities/Dish';

export class FakeDishesRepository implements IDishesRepository {
  private dishes: Dish[] = [];
  public async create({
    name,
    description,
    image,
    price,
    resume,
    restaurantId,
  }: ICreateDishesDTO): Promise<Dish> {
    const dish = {} as Dish;

    Object.assign(dish, {
      id: uuid(),
      name,
      description,
      image,
      price,
      resume,
      restaurantId,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    this.dishes.unshift(dish);

    return dish;
  }

  public async findById(id: string): Promise<Dish | null> {
    const dish = this.dishes.find(findDish => findDish.id === id);

    return dish || null;
  }

  public async getAllDishesFromRestaurantExceptOne(
    exceptById: string,
    restaurantId: string,
  ): Promise<Dish[]> {
    const dishes = this.dishes.filter(
      findDish =>
        findDish.id !== exceptById && findDish.restaurantId === restaurantId,
    );

    return dishes;
  }

  public async findOne(props: Partial<Dish>): Promise<Dish | null> {
    const dish = this.dishes.find(findDish => {
      return Object.entries(props).every(
        ([key, value]) => findDish[key as keyof Dish] === value,
      );
    });

    return dish || null;
  }
}
