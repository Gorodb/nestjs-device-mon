import { IsEnum, IsInt, Min, Max } from 'class-validator';
import { Actions } from '../enums/actions.enum';
import { enumToString } from '../../helpers/enum-helper';
import { pinCodesMessages } from './userMessages';

export class PinCodesDto {
  @IsInt({ message: pinCodesMessages.en.isNumber })
  @Min(100000, { message: pinCodesMessages.en.isSixSymbolsLength })
  @Max(999999, { message: pinCodesMessages.en.isSixSymbolsLength })
  code: number;

  @IsEnum(Actions, {
    message: `${pinCodesMessages.en.action}: ${enumToString(Actions)}`,
  })
  action: Actions;
}
