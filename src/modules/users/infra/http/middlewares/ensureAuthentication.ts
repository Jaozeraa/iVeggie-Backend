import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError(ErrorsEnum.invalidCredentials, 401);
  }

  const { secret } = authConfig.jwtAccessToken;

  const [, accessToken] = authHeader.split(' ');

  try {
    const decoded = verify(accessToken, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };
  } catch {
    throw new AppError(ErrorsEnum.invalidCredentials, 401);
  }

  return next();
}
