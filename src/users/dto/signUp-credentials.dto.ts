import { IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { Departments } from '../../departments/departments.entity';
import { createUserMessages } from './userMessages';

export class SignUpCredentialsDto {
  @IsString()
  @Matches(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: createUserMessages.en.email,
  })
  email: string;

  @IsString()
  @MinLength(6, { message: createUserMessages.en.password })
  password: string;

  @IsUUID('all', { message: createUserMessages.en.department })
  @IsString({ message: createUserMessages.en.department })
  department: Departments;
}
