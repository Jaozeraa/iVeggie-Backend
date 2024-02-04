import { v4 as uuid } from 'uuid';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/prisma/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = {} as User;

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.users.unshift(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(findUser => findUser.email === email);

    return user || null;
  }
}

export default FakeUsersRepository;
