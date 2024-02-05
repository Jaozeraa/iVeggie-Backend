import { injectable, inject } from 'tsyringe';
import path from 'path';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { ErrorsEnum } from '@shared/errors/ErrorsEnum';

interface IRequestDTO {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    await this.mailProvider.waitForReady();

    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new AppError(ErrorsEnum.userNotFound);
    }

    const { pin } = await this.userTokensRepository.generate({
      userId: user.id,
    });

    const forgotTemplateFilePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[iVeggie] Recuperação de senha',
      templateData: {
        file: forgotTemplateFilePath,
        variables: {
          name: user.name,
          pin,
        },
      },
    });
  }
}
