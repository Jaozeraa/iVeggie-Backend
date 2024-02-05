import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface IRequestDTO {
  pin: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ pin, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByPin(pin);

    if (!userToken) {
      throw new AppError(ErrorsEnum.expiredToken);
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError(ErrorsEnum.userNotFound);
    }

    const tokenCreatedAt = userToken.createdAt;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError(ErrorsEnum.expiredToken);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}
