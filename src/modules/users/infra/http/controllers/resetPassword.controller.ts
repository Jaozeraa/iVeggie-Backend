import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, pin } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({ password, pin });

    return response.status(204).send();
  }
}
