import { v4 as uuid } from 'uuid';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/prisma/entities/User';

export class FakeUsersRepository implements IUsersRepository {
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
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    this.users.unshift(user);

    return user;
  }

  public async findOne(props: Partial<User>): Promise<User | null> {
    const user = this.users.find(findUser => {
      return Object.entries(props).every(
        ([key, value]) => findUser[key as keyof User] === value,
      );
    });

    return user || null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(findUser => findUser.id === id);

    return user || null;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);

    this.users.splice(userIndex, 1);
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      findUuser => findUuser.id === user.id,
    );
    this.users[findIndex] = user;

    return user;
  }
}
