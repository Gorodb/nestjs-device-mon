import {
  IsEnum,
  IsInstance,
  IsJSON,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UsersRoles } from '../enums/users-roles.enum';
import { enumToString } from '../../helpers/enum-helper';
import { SignUpCredentialsDto } from './signUp-credentials.dto';
import { FileElementResponseDto } from '../../files/dto/file-element-response.dto';

export class CreateUserDto extends SignUpCredentialsDto {
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
  @IsString({ message: 'Неправильно введено имя' })
  name?: string;

  @IsOptional()
  @IsNotEmptyObject(
    { nullable: true },
    { message: 'Логотип должен быть валидным json-ом' },
  )
  @IsObject({ message: 'Логотип должен быть валидным json-ом' })
  logo: FileElementResponseDto;
}
