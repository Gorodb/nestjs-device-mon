import { IsString, IsOptional, IsUUID } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { Departments } from '../../departments/departments.entity';
import { DeviceTypes } from '../../device-types/device-types.entity';

export class DevicesDto {
  @IsString({ message: 'Имя устройства должно быть строковым' })
  name: string;

  @IsOptional()
  @IsUUID(4, { message: 'Владелец устройства должен быть валидным UUID' })
  owner: Users;

  @IsOptional()
  @IsUUID(4, {
    message: 'Обновивший устройство пользователь должно быть валидным UUID',
  })
  updatedByUser: Users;

  @IsUUID(4, { message: 'Тип устройства должен быть валидным UUID' })
  deviceType: DeviceTypes;

  @IsString({
    message: 'Название операционной системы устройства должно быть строковым',
  })
  osName: string;

  @IsString({ message: 'Место хранения устройства должно быть строковым' })
  defaultLocation: string;

  @IsUUID(4, { message: 'Подразделение устройства должно быть валидным UUID' })
  department: Departments;

  @IsOptional()
  @IsString({
    message: 'Текущее место хранения устройства должно быть строковым',
  })
  currentLocation: string;

  @IsOptional()
  @IsString({ message: 'Уровень заряда устройства должно быть строковым' })
  charge: string;
}
