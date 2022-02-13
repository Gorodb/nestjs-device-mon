import { IsNotEmptyObject, IsObject, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { Departments } from '../../departments/departments.entity';
import { FileElementResponseDto } from '../../files/dto/file-element-response.dto';

export class FillUserDataDto {
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

  @IsUUID('all', { message: 'Id отдела должен быть UID' })
  @IsString({ message: 'Id отдела должен быть UID' })
  department: Departments;

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
}
