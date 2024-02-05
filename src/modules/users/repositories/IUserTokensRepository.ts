import { UserToken } from '@prisma/client';
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

export interface IUserTokensRepository {
  generate(props: ICreateUserTokenDTO): Promise<UserToken>;
  findByPin(token: string): Promise<UserToken | null>;
}
