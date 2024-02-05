import { Dish } from '../entities/Dish';
import { PrismaClient } from '@prisma/client';
import { IDishesRepository } from '@modules/restaurants/repositories/IDishesRepository';
import { ICreateDishesDTO } from '@modules/restaurants/dtos/ICreateDishesDTO';

export class DishesRepository implements IDishesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(dish: ICreateDishesDTO): Promise<Dish> {
    return this.prisma.dish.create({ data: dish });
  }

  async getAllDishesFromRestaurantExceptOne(
    exceptDishId: string,
    restaurantId: string,
  ): Promise<Dish[]> {
    return this.prisma.dish.findMany({
      where: { id: { not: exceptDishId }, restaurantId },
      take: 2,
    });
  }

  async findOne(props: Partial<Dish>): Promise<Dish | null> {
    return this.prisma.dish.findFirst({ where: { ...props } });
  }

  async findById(id: string): Promise<Dish | null> {
    return this.prisma.dish.findUnique({ where: { id } });
  }
}
