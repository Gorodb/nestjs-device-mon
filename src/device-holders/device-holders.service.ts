import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from '../devices/devices.repository';
import { DeviceHoldersRepository } from './device-holders.repository';
import { DeviceHolderDto } from './dto/device-holders.dto';
import { Users } from '../users/entities/users.entity';
import { DeviceHolders } from './device-holders.entity';

@Injectable()
export class DeviceHoldersService {
  constructor(
    @InjectRepository(DeviceHoldersRepository)
    private readonly deviceHoldersRepository: DeviceHoldersRepository,
    @InjectRepository(DevicesRepository)
    private readonly devicesRepository: DevicesRepository,
  ) {
  }

  async takeDevice(
    deviceHolderDto: DeviceHolderDto,
    user: Users,
  ): Promise<{ success: boolean }> {
    await this.updateDeviceOnTake(deviceHolderDto, user);
    return this.deviceHoldersRepository.takeDevice(deviceHolderDto, user);
  }

  async returnDevice(
    deviceHolderDto: DeviceHolderDto,
  ): Promise<{ success: boolean }> {
    await this.updateDeviceOnReturn(deviceHolderDto);
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
    await this.updateDeviceOnReturnToPrevious(deviceHolderDto, holder);
    return this.deviceHoldersRepository.returnToPrevious(deviceHolderDto, user);
  }

  async updateDeviceOnTake(
    { device }: DeviceHolderDto,
    user?: Users,
  ): Promise<void> {
    const holder = await this.deviceHoldersRepository.findDeviceHolder({
      device,
    });
    const { affected } =
      holder && holder.currentUser
        ? await this.devicesRepository.update(device, {
            heldByUser: user,
            previousUser: holder.currentUser,
          })
        : await this.devicesRepository.update(device, {
            heldByUser: user,
          });
    if (!affected) {
      throw new NotFoundException(`Устройство с id ${device} не найдено`);
    }
  }

  async updateDeviceOnReturn({ device }: DeviceHolderDto): Promise<void> {
    const { affected } = await this.devicesRepository.update(device, {
      heldByUser: null,
      previousUser: null,
    });
    if (!affected) {
      throw new NotFoundException(`Устройство с id ${device} не найдено`);
    }
  }

  async updateDeviceOnReturnToPrevious(
    { device }: DeviceHolderDto,
    holders: DeviceHolders,
  ): Promise<void> {
    const { affected } = await this.devicesRepository.update(device, {
      heldByUser: holders.previousUser,
      previousUser: holders.currentUser,
    });
    if (!affected) {
      throw new NotFoundException(`Устройство с id ${device} не найдено`);
    }
  }
}
