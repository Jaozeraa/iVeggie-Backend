import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO';
import { User } from '../infra/prisma/entities/User';
import authConfig from '@config/auth';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface IResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(props: IAuthenticateUserDTO): Promise<IResponse> {
    const { email, password } = props;

    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new AppError(ErrorsEnum.invalidCredentials);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError(ErrorsEnum.invalidCredentials);
    }

    const { expiresIn: accessTokenExpiresIn, secret: accessTokenSecret } =
      authConfig.jwtAccessToken;

    const { expiresIn: refreshTokenExpiresIn, secret: refreshTokenSecret } =
      authConfig.jwtRefreshToken;

    const accessToken = sign({}, accessTokenSecret, {
      expiresIn: accessTokenExpiresIn,
      subject: user.id,
    });

    const refreshToken = sign({}, refreshTokenSecret, {
      expiresIn: refreshTokenExpiresIn,
      subject: user.id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    } as IResponse;
  }
}
