import { IsEnum, IsInt, Min, Max } from 'class-validator';
import { Actions } from '../enums/actions.enum';
import { enumToString } from '../../helpers/enum-helper';

export class PinCodesDto {
  @IsInt({ message: 'Код должен быть числом' })
  @Min(100000, { message: 'Код должен быть шестизначным' })
  @Max(999999, { message: 'Код должен быть шестизначным' })
  code: number;

  @IsEnum(Actions, {
    message: `Значение должно быть одним из: ${enumToString(Actions)}`,
  })
  action: Actions;
}
