import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { DeviceTypes } from './device-types.entity';
import { DeviceTypesDto } from './dto/device-types.dto';

@EntityRepository(DeviceTypes)
export class DeviceTypesRepository extends Repository<DeviceTypes> {
  private logger = new Logger('Device types repository', true);

  async createDeviceType(deviceTypesDro: DeviceTypesDto): Promise<DeviceTypes> {
    const deviceType = this.create(deviceTypesDro);
    await this.save(deviceType);
    this.logger.log(`Создан тип устройства ${JSON.stringify(deviceType)}`);
    return deviceType;
  }
}
