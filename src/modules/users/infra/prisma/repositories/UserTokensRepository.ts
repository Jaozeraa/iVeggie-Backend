import { PrismaClient } from '@prisma/client';

import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { UserToken } from '../entities/UserToken';
import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';

export class UserTokensRepository implements IUserTokensRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findByPin(pin: string): Promise<UserToken | null> {
    const userToken = await this.prisma.userToken.findFirst({
      where: { pin },
    });

    return userToken;
  }

  public async generate({ userId }: ICreateUserTokenDTO): Promise<UserToken> {
    const pinNumber = Math.floor(100000 + Math.random() * 900000);

    const pin = String(pinNumber);

    const userToken = await this.prisma.userToken.create({
      data: {
        userId,
        pin,
      },
    });

    return userToken;
  }
}
