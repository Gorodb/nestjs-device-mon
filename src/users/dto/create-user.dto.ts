import {
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { UsersRoles } from '../enums/users-roles.enum';
import { enumToString } from '../../helpers/enum-helper';
import { FileElementResponseDto } from '../../files/dto/file-element-response.dto';
import { Departments } from '../../departments/departments.entity';
import { createUserMessages } from './userMessages';

export class CreateUserDto {
  @IsOptional()
  @IsEnum(UsersRoles, {
    message: `${createUserMessages.en.role} ${enumToString(UsersRoles)}`,
  })
  role?: UsersRoles;

  @IsOptional()
  @IsString({ message: createUserMessages.en.description })
  description?: string;

  @IsOptional()
  @IsString()
  @Length(6, 15, { message: createUserMessages.en.phone })
  phone?: string;

  @IsOptional()
  @IsString({ message: createUserMessages.en.name })
  name?: string;

  @IsOptional()
  @IsString({ message: createUserMessages.en.location })
  location?: string;

  @IsOptional()
  @IsNotEmptyObject({ nullable: true }, { message: createUserMessages.en.logo })
  @IsObject({ message: createUserMessages.en.logo })
  logo?: FileElementResponseDto;

  @IsString()
  @Matches(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: createUserMessages.en.email,
  })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: createUserMessages.en.password })
  password?: string;

  @IsUUID('all', { message: createUserMessages.en.department })
  @IsString({ message: createUserMessages.en.department })
  department: Departments;
}
