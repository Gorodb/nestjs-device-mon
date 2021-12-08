import { IsEnum, IsString, Length } from 'class-validator';
import { Actions } from '../enums/actions';

export class PinCodesDto {
  @IsString()
  @Length(4, 4)
  code: string;

  @IsEnum(Actions, { message: `Значение должно быть одним из: ${Actions}` })
  action: Actions;
}
