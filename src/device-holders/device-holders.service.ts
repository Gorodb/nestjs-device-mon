import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from '../devices/devices.repository';
import { DeviceHoldersRepository } from './device-holders.repository';
import { DeviceHolderDto } from './dto/device-holders.dto';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class DeviceHoldersService {
  constructor(
    @InjectRepository(DeviceHoldersRepository)
    private readonly deviceHoldersRepository: DeviceHoldersRepository,
    @InjectRepository(DevicesRepository)
    private readonly devicesRepository: DevicesRepository,
  ) {}

  async takeDevice(
    deviceHolderDto: DeviceHolderDto,
    user: Users,
  ): Promise<{ success: boolean }> {
    await this.updateDevice(deviceHolderDto, user);
    return this.deviceHoldersRepository.takeDevice(deviceHolderDto, user);
  }

  async returnDevice(
    deviceHolderDto: DeviceHolderDto,
  ): Promise<{ success: boolean }> {
    await this.updateDevice(deviceHolderDto);
    return this.deviceHoldersRepository.returnDevice(deviceHolderDto);
  }

  async returnToPrevious(
    deviceHolderDto: DeviceHolderDto,
    user: Users,
  ): Promise<{ success: boolean }> {
    const holder = await this.deviceHoldersRepository.findDeviceHolder(
      deviceHolderDto,
    );
    if (!holder.previousUser.id) {
      throw new ForbiddenException('Вы взяли это устройство из места хранения');
    }
    if (user.id === holder.previousUser.id) {
      throw new ForbiddenException('Нельзя вернуть устройство самому себе');
    }
    await this.updateDevice(deviceHolderDto, holder.previousUser);
    return this.deviceHoldersRepository.returnToPrevious(deviceHolderDto, user);
  }

  async updateDevice({ device }: DeviceHolderDto, user?: Users): Promise<void> {
    const { affected } = user
      ? await this.devicesRepository.update(device, {
          heldByUser: user,
        })
      : await this.devicesRepository.update(device, {
          heldByUser: null,
        });
    if (!affected) {
      throw new NotFoundException(`Устройство с id ${device} не найдено`);
    }
  }
}
