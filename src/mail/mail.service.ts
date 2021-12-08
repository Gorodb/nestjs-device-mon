import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, code: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Спасибо за регистрацию!',
      template: './confirmation',
      context: {
        name: user.name,
        code,
      },
    });
  }
}
