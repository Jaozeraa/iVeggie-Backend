import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { User } from '../infra/prisma/entities/User';

export default interface IUsersRepository {
  create(payload: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
