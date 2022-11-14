import { EntityRepository, Repository } from 'typeorm';
import { DeviceHolders } from './device-holders.entity';
import { Logger } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { DeviceHolderDto } from './dto/device-holders.dto';

@EntityRepository(DeviceHolders)
export class DeviceHoldersRepository extends Repository<DeviceHolders> {
  private logger = new Logger('Device holders repository', true);

  findDeviceHolder({ device }: DeviceHolderDto): Promise<DeviceHolders> {
    return this.findOne({ where: { device } });
  }

  private async createDeviceHolder(
    { device }: DeviceHolderDto,
    user: Users,
  ): Promise<void> {
    const deviceHolder = await this.create({
      device,
      currentUser: user,
    });
    await this.save(deviceHolder);
  }

  async takeDevice(
    { device }: DeviceHolderDto,
    user: Users,
  ): Promise<{ success: boolean }> {
    this.logger.log(`User with id ${user.id} have taken device ${device}`);
    const isHeld = await this.findDeviceHolder({ device });
    if (isHeld) {
      await this.update(isHeld.id, {
        device,
        previousUser: isHeld.currentUser,
        currentUser: user,
      });
    } else {
      await this.createDeviceHolder({ device }, user);
    }
    return { success: true };
  }

  async returnDevice(
    deviceHolderDto: DeviceHolderDto,
  ): Promise<{ success: boolean }> {
    await this.delete(deviceHolderDto);
    return { success: true };
  }

  async returnToPrevious(
    deviceHolderDto: DeviceHolderDto,
    user: Users,
  ): Promise<{ success: boolean }> {
    const deviceHolders = await this.findDeviceHolder(deviceHolderDto);
    if (!deviceHolders) {
      await this.createDeviceHolder(deviceHolderDto, user);
    } else {
      await this.update(deviceHolders.id, {
        ...deviceHolders,
        currentUser: deviceHolders.previousUser,
        previousUser: user,
      });
    }
    return { success: true };
  }
}
