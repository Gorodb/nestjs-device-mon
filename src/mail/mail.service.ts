import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { emailMessages } from './email.messages';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, code: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: emailMessages.en.sendUserConfirmation,
      template: __dirname + '/confirmation',
      context: {
        name: user.name,
        code,
      },
    });
  }

  async sendForgotPasswordToken(user: Users, code: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: emailMessages.en.sendForgotPasswordToken,
      template: __dirname + '/forgot-password',
      context: { code },
    });
  }
}
