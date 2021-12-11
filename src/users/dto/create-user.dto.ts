import { IsOptional, IsString, Length } from 'class-validator';

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
}
