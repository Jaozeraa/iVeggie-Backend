import { User } from '../entities/User';
import { PrismaClient } from '@prisma/client';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(user: User): Promise<User> {
    return this.prisma.user.update({ where: { id: user.id }, data: user });
  }

  async create(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOne(props: Partial<User>): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { ...props } });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
