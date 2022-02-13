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

export class CreateUserDto {
  @IsOptional()
  @IsEnum(UsersRoles, {
    message: `Значение должно быть одним из ${enumToString(UsersRoles)}`,
  })
  role?: UsersRoles;

  @IsOptional()
  @IsString({ message: 'Описание заполнено некорректно' })
  description?: string;

  @IsOptional()
  @IsString()
  @Length(6, 12, { message: 'Телефон должен содержать от 6 до 12 символов' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Ошибка при сохранении имени' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Ошибка при сохранении местоположения' })
  location?: string;

  @IsOptional()
  @IsNotEmptyObject(
    { nullable: true },
    { message: 'Логотип должен быть валидным json-ом' },
  )
  @IsObject({ message: 'Логотип должен быть валидным json-ом' })
  logo?: FileElementResponseDto;

  @IsString()
  @Matches(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: 'Введите валидный email',
  })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать больше 6 символов' })
  password?: string;

  @IsUUID('all', { message: 'Id отдела должен быть UID' })
  @IsString({ message: 'Id отдела должен быть UID' })
  department: Departments;
}
