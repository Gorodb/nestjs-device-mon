import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from './devices.repository';
import { DevicesDto } from './dto/devices.dto';
import { Devices } from './devices.entity';
import { OrderEnum, Pagination, PaginationOptionsDto } from '../paginate';
import {
  paginate,
  paginationQueryBuilder,
} from '../paginate/pagination.query-builder';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private readonly devicesRepository: DevicesRepository,
  ) {}

  createDevice(deviceDto: DevicesDto): Promise<Devices> {
    if (!deviceDto.currentLocation) {
      deviceDto.currentLocation = deviceDto.defaultLocation;
    }
    return this.devicesRepository.createDevice(deviceDto);
  }

  async getDeviceById(id: string): Promise<Devices> {
    const device = await this.devicesRepository.findOne(id);
    if (!device) {
      throw new NotFoundException(`Устройства с id ${id} не найдено`);
    }
    return device;
  }

  async updateDeviceByAdmin(
    id: string,
    deviceDto: DevicesDto,
  ): Promise<Devices> {
    const device = await this.getDeviceById(id);
    const isUpdated = await this.devicesRepository.update(id, deviceDto);
    if (!isUpdated.affected) {
      throw new ForbiddenException('Не удалось обновить устройство');
    }
    return { ...device, ...deviceDto };
  }

  async deleteDevice(id: string): Promise<{ success: boolean }> {
    const { affected } = await this.devicesRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Устройства с id ${id} не найдено`);
    }
    return { success: true };
  }

  async geMyTakenDevices(user: Users): Promise<{ items: Devices[] }> {
    const devices = await this.devicesRepository.find({ heldByUser: user });
    return { items: devices };
  }

  async getAllDevices(
    options: PaginationOptionsDto,
    search?: string,
    department?: string,
    deviceType?: string,
  ): Promise<Pagination<Devices>> {
    const queryBuilder = paginationQueryBuilder(
      'devices',
      this.devicesRepository,
      options,
      { field: 'created', order: OrderEnum.DESC },
      { fields: ['id', 'name', 'osName', 'inventoryNumber'], search },
    );
    this.addJoinDependencies(queryBuilder);
    if (department) {
      queryBuilder.andWhere({ department });
    }
    if (deviceType) {
      queryBuilder.andWhere({ deviceType });
    }
    return paginate(queryBuilder, options);
  }

  private addJoinDependencies(queryBuilder): void {
    queryBuilder.leftJoinAndSelect('devices.department', 'departments');
    queryBuilder.leftJoinAndSelect('devices.deviceType', 'device_types');
    queryBuilder.leftJoinAndSelect('devices.owner', 'owner');
    queryBuilder.leftJoinAndSelect('devices.heldByUser', 'users');
    queryBuilder.leftJoinAndSelect('devices.previousUser', 'previousUser');
  }
}
