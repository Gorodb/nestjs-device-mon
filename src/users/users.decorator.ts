import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Users } from './entities/users.entity';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { serviceMessages } from './dto/userMessages';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): Users => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);

export const GetJwtToken = createParamDecorator(
  (_data, context: ExecutionContext): JwtPayload => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.access_token
      ? req.headers.access_token
      : req.headers.authorization;
    if (!token) {
      throw new ForbiddenException(serviceMessages.en.invalidToken);
    }
    return token;
  },
);
