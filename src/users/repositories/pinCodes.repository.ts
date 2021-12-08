import { Repository, EntityRepository } from 'typeorm';
import { Logger, BadRequestException } from '@nestjs/common';
import { PinCodes } from '../entities/pinCodes.entity';
import { Actions } from '../enums/actions';

@EntityRepository(PinCodes)
export class PinCodesRepository extends Repository<PinCodes> {
  private logger = new Logger('DepartmentRepository', true);

  async createPinCode(userId: string, action: Actions): Promise<PinCodes> {
    const pinCode = this.create({
      pincode: `${Math.floor(Math.random() * 9999) + 1}`,
      user: userId,
      expirationDate: Date.now() + 60 * 60 * 1000,
      action,
    });
    this.logger.log(`Создаем пин-код ${JSON.stringify(pinCode)}`);
    if (!pinCode) {
      throw new BadRequestException(
        'Не удалось выслать код на почту, попробуйте позже',
      );
    }
    await this.save(pinCode);
    return pinCode;
  }
}
