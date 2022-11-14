import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceTypesDto } from './dto/device-types.dto';
import { DeviceTypesRepository } from './device-types.repository';
import { DeviceTypes } from './device-types.entity';
import { OrderEnum, Pagination, PaginationOptionsDto } from '../paginate';
import {
  paginate,
  paginationQueryBuilder,
} from '../paginate/pagination.query-builder';

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
      throw new NotFoundException(`Device type with id ${id} not found`);
    }
    return { success: true };
  }

  async getDeviceTypeById(id: string): Promise<DeviceTypes> {
    const deviceType = await this.deviceTypesRepository.findOne(id);
    if (!deviceType) {
      throw new NotFoundException(`Device type with id ${id} not found`);
    }
    return deviceType;
  }

  async getAllDeviceTypes(
    options: PaginationOptionsDto,
    search?: string,
  ): Promise<Pagination<DeviceTypes>> {
    const queryBuilder = paginationQueryBuilder(
      'device_types',
      this.deviceTypesRepository,
      options,
      { field: 'created', order: OrderEnum.DESC },
      { fields: ['id', 'deviceType', 'title', 'description'], search },
    );
    return paginate(queryBuilder, options);
  }
}
