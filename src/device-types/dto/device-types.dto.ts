import { IsString } from 'class-validator';
import { deviceTypesMessages } from './device-types.messages';

export class DeviceTypesDto {
  @IsString({ message: deviceTypesMessages.en.deviceType })
  deviceType: string;

  @IsString({ message: deviceTypesMessages.en.title })
  title: string;

  @IsString({ message: deviceTypesMessages.en.description })
  description: string;
}
