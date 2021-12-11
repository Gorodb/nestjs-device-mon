import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}
}
