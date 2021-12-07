import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTypes } from './device-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceTypes])],
})
export class DeviceTypesModule {}
