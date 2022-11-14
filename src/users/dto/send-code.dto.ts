import { IsEnum, IsString } from 'class-validator';
import { Actions } from '../enums/actions.enum';
import { enumToString } from '../../helpers/enum-helper';
import { createUserMessages, pinCodesMessages} from './userMessages';

export class SendCodeDto {
  @IsEnum(Actions, {
    message: `${pinCodesMessages.en.action}: ${enumToString(Actions)}`,
  })
  action: Actions;

  @IsString({ message: createUserMessages.en.email })
  email: string;
}
