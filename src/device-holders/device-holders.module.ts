import { Module } from '@nestjs/common';
import { DeviceHoldersService } from './device-holders.service';
import { DeviceHoldersController } from './device-holders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceHoldersRepository } from './device-holders.repository';
import { UsersModule } from '../users/users.module';
import { DevicesRepository } from '../devices/devices.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceHoldersRepository, DevicesRepository]),
    UsersModule,
  ],
  providers: [DeviceHoldersService],
  controllers: [DeviceHoldersController],
})
export class DeviceHoldersModule {}
