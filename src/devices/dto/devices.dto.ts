import { IsString } from 'class-validator';

export class DevicesDto {
  @IsString({ message: 'Тип устройства должен быть строкой' })
  deviceType: string;

  @IsString({ message: 'Названия типа устройства должно быть строкой' })
  title: string;

  @IsString({ message: 'Описание типа устройства должно быть строкой' })
  description: string;
}
