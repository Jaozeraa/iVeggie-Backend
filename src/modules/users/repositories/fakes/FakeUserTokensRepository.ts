import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { UserToken } from '@modules/users/infra/prisma/entities/UserToken';
import { v4 as uuid } from 'uuid';
import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];
  public async generate({ userId }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = {} as UserToken;

    const pinNumber = Math.floor(100000 + Math.random() * 900000);

    const pin = String(pinNumber);

    Object.assign(userToken, {
      id: uuid(),
      userId,
      pin,
      token: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.unshift(userToken);

    return userToken;
  }
  public async findByPin(pin: string): Promise<UserToken | null> {
    const userToken = this.userTokens.find(findToken => findToken.pin === pin);

    return userToken || null;
  }
}
