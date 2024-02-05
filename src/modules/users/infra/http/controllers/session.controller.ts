import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { RefreshUserTokenService } from '@modules/users/services/RefreshUserTokenService';
import { excludeProperty } from '@shared/utils/excludeProperty';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const data = await authenticateUser.execute({ email, password });

    const formattedData = {
      ...data,
      user: excludeProperty(data.user, ['password']),
    };

    return response.json(formattedData);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;
    const refreshUserToken = container.resolve(RefreshUserTokenService);

    const data = await refreshUserToken.execute(refreshToken);

    return response.json(data);
  }
}
