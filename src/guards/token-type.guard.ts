import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { guardsMessages } from './guards.messages';

export const TokenType = createParamDecorator(
  (roles: Array<UsersRoles>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const users: Users = request.user;

    if (!roles.includes(users.role)) {
      throw new ForbiddenException(
        guardsMessages.en.forbiddenTokenException,
      );
    }
  },
);
