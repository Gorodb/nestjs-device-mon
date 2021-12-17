import { IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { Departments } from '../../departments/departments.entity';

export class SignUpCredentialsDto {
  @IsString()
  @Matches(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: 'Введите валидный email',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Введенный пароль слишком слабый.',
  })
  password: string;

  @IsUUID('all', { message: 'Id отдела должен быть UID' })
  @IsString({ message: 'Id отдела должен быть UID' })
  department: Departments;
}
