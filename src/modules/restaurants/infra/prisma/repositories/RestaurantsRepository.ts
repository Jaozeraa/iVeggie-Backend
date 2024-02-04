import { Restaurant } from '../entities/Restaurant';
import { PrismaClient } from '@prisma/client';
import { IRestaurantsRepository } from '@modules/restaurants/repositories/IRestaurantsRepository';

export class RestaurantsRepository implements IRestaurantsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(restaurant: Restaurant): Promise<Restaurant> {
    return this.prisma.restaurant.create({ data: restaurant });
  }

  async findById(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findFirst({ where: { id } });
  }
}
