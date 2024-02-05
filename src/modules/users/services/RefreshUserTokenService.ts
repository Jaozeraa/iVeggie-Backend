import { injectable, inject } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface IResponse {
  accessToken: string;
  newRefreshToken: string;
}

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@injectable()
export class RefreshUserTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(refreshToken: string): Promise<IResponse> {
    const { secret } = authConfig.jwtRefreshToken;
    let userId: string;
    try {
      const { sub } = verify(refreshToken, secret) as ITokenPayload;
      userId = sub;
    } catch {
      throw new AppError(ErrorsEnum.invalidCredentials);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError(ErrorsEnum.userNotFound);
    }

    const { secret: accessTokenSecret, expiresIn: accessTokenExpiresIn } =
      authConfig.jwtAccessToken;
    const accessToken = sign({}, accessTokenSecret, {
      expiresIn: accessTokenExpiresIn,
      subject: userId,
    });

    const { secret: refreshTokenSecret, expiresIn: refreshTokenExpiresIn } =
      authConfig.jwtRefreshToken;

    const newRefreshToken = sign({}, refreshTokenSecret, {
      expiresIn: refreshTokenExpiresIn,
      subject: userId,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }
}
