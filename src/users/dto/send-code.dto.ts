import { IsEnum, IsString } from 'class-validator';
import { Actions } from '../enums/actions.enum';
import { enumToString } from '../../helpers/enum-helper';

export class SendCodeDto {
  @IsEnum(Actions, {
    message: `Значение должно быть одним из: ${enumToString(Actions)}`,
  })
  action: Actions;

  @IsString({ message: 'Email должен быть строкой' })
  email: string;
}
