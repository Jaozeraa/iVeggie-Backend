import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/prisma/entities/User';

export interface IUsersRepository {
  save(payload: ICreateUserDTO): Promise<User>;
  create(payload: ICreateUserDTO): Promise<User>;
  findOne(props: Partial<User>): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
