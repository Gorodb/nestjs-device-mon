import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeviceTypesDto } from './dto/device-types.dto';
import { DeviceTypesRepository } from './device-types.repository';
import { DeviceTypes } from './device-types.entity';
import { DeviceTypesPaginationConfig } from './device-types.pagination-config';

@Injectable()
export class DeviceTypesService {
  constructor(
    @InjectRepository(DeviceTypesRepository)
    private readonly deviceTypesRepository: DeviceTypesRepository,
  ) {}

  createDeviceType(deviceTypesDto: DeviceTypesDto): Promise<DeviceTypes> {
    return this.deviceTypesRepository.createDeviceType(deviceTypesDto);
  }

  async updateDeviceType(
    id: string,
    deviceTypesDto: DeviceTypesDto,
  ): Promise<DeviceTypes> {
    const deviceType = await this.getDeviceTypeById(id);
    await this.deviceTypesRepository.update(id, deviceTypesDto);
    return { ...deviceType, ...deviceTypesDto };
  }

  async deleteDeviceType(id: string): Promise<{ success: boolean }> {
    const { affected } = await this.deviceTypesRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Тип устройства с id ${id} не найден`);
    }
    return { success: true };
  }

  async getDeviceTypeById(id: string): Promise<DeviceTypes> {
    const deviceType = await this.deviceTypesRepository.findOne(id);
    if (!deviceType) {
      throw new NotFoundException(`Тип устройства с id ${id} не найден`);
    }
    return deviceType;
  }

  getAllDeviceTypes(query: PaginateQuery): Promise<Paginated<DeviceTypes>> {
    return paginate(
      query,
      this.deviceTypesRepository,
      DeviceTypesPaginationConfig,
    );
  }
}
