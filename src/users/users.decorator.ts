import {
  createParamDecorator,
  ExecutionContext, ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from './entities/users.entity';
import { JwtPayload } from './jwt-payload.interface';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): Users => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);

export const GetJwtPayload = createParamDecorator(
  (_data, context: ExecutionContext): JwtPayload => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.access_token;
    if (!token) {
      throw new ForbiddenException('Передан некорректный токен');
    }
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Передан некорректный токен');
    }
  },
);

export const GetJwtToken = createParamDecorator(
  (_data, context: ExecutionContext): JwtPayload => {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.access_token;
    if (!token) {
      throw new ForbiddenException('Передан некорректный токен');
    }
    return token;
  },
);
