import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(props: ICreateUserDTO) {
    const userWithSameEmail = await this.usersRepository.findOne({
      email: props.email,
    });

    if (userWithSameEmail) {
      throw new AppError(ErrorsEnum.emailAlreadyExists);
    }

    const hashedPassword = await this.hashProvider.generateHash(props.password);

    props.password = hashedPassword;

    const user = await this.usersRepository.create(props);

    return user;
  }
}
