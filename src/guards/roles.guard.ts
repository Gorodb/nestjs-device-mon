import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UsersRoles[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Users = request.user;
    if (user.role === UsersRoles.ADMIN) {
      return true;
    }
    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Это действие недоступно');
    }
    return roles.includes(user.role);
  }
}

export const Roles = (...roles: UsersRoles[]) =>
  applyDecorators(
    UseGuards(AuthGuard()),
    UseGuards(RolesGuard),
    SetMetadata('roles', roles),
  );
