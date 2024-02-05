import nodemailer, { Transporter } from 'nodemailer';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import { IMailProvider } from '../models/IMailProvider';
import { ISendMailDTO } from '../dtos/ISendMailDTO';

import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  private isReady: boolean = false;
  private readyPromise: Promise<void>;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.readyPromise = this.init();
  }

  private async init(): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    this.client = transporter;
    this.isReady = true;
  }

  public async waitForReady(): Promise<void> {
    if (!this.isReady) {
      await this.readyPromise;
    }
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.waitForReady();

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe iVeggie',
        address: from?.email || 'equipe@iveggie.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
