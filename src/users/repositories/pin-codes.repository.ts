import { Repository, EntityRepository, MoreThan } from 'typeorm';
import {
  Logger,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PinCodes } from '../entities/pin-codes.entity';
import { Actions } from '../enums/actions.enum';
import { PinCodesDto } from '../dto/pin-codes.dto';
import { pinCodesMessages } from './repositories.messages';

@EntityRepository(PinCodes)
export class PinCodesRepository extends Repository<PinCodes> {
  private logger = new Logger('DepartmentRepository', true);

  async createPinCode(userId: string, action: Actions): Promise<PinCodes> {
    const pinCode = this.create({
      user: userId,
      expirationDate: Date.now() + 60 * 60 * 1000,
      action,
    });
    this.logger.log(`Creating pin-code ${JSON.stringify(pinCode)}`);
    if (!pinCode) {
      throw new BadRequestException(pinCodesMessages.en.bedRequest);
    }
    await this.save(pinCode);
    return pinCode;
  }

  async getPinCode(pinCodeDto: PinCodesDto, userId: string): Promise<PinCodes> {
    const { code, action } = pinCodeDto;
    const pinCode = await this.findOne({
      where: {
        pincode: code,
        user: userId,
        action,
        isUsed: false,
        expirationDate: MoreThan(Date.now()),
      },
    });
    if (!pinCode) {
      throw new ForbiddenException(pinCodesMessages.en.codeNotFound);
    }
    return pinCode;
  }

  async setCodeUsed(pinCode: PinCodes): Promise<void> {
    await this.update(pinCode.id, { ...pinCode, isUsed: true });
  }
}
