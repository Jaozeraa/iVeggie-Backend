import { Restaurant } from '../entities/Restaurant';
import { PrismaClient } from '@prisma/client';
import { IRestaurantsRepository } from '@modules/restaurants/repositories/IRestaurantsRepository';
import { ICreateRestaurantDTO } from '@modules/restaurants/dtos/ICreateRestaurantDTO';

export class RestaurantsRepository implements IRestaurantsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(restaurant: ICreateRestaurantDTO): Promise<Restaurant> {
    return this.prisma.restaurant.create({ data: restaurant });
  }

  async findById(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { dishes: true },
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({
      orderBy: {
        rate: 'desc',
      },
    });
  }

  async findOne(props: Restaurant): Promise<Restaurant | null> {
    return this.prisma.restaurant.findFirst({ where: props });
  }

  public async search(payload: string): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      where: {
        OR: [
          {
            name: {
              contains: payload,
              mode: 'insensitive',
            },
          },
          {
            dishes: {
              some: {
                OR: [
                  {
                    name: {
                      contains: payload,
                      mode: 'insensitive',
                    },
                  },
                  {
                    resume: {
                      contains: payload,
                      mode: 'insensitive',
                    },
                  },
                  {
                    description: {
                      contains: payload,
                      mode: 'insensitive',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      orderBy: {
        rate: 'desc',
      },
    });

    return restaurants;
  }
}
