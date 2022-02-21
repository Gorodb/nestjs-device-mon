import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, code: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Спасибо за регистрацию!',
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
      subject: 'Забыли пароль?',
      template: __dirname + '/forgot-password',
      context: { code },
    });
  }
}
