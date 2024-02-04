import { User } from '../entities/User';
import { PrismaClient } from '@prisma/client';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
