import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Devices } from './devices.entity';
import { DevicesDto } from './dto/devices.dto';

@EntityRepository(Devices)
export class DevicesRepository extends Repository<Devices> {
  private logger = new Logger('Devices repository', true);

  async createDevice(devicesDto: DevicesDto): Promise<Devices> {
    const device = this.create(devicesDto);
    await this.save(device);
    this.logger.log(`Создано устройство ${JSON.stringify(device)}`);
    return device;
  }
}
