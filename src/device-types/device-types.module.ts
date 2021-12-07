import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTypesEntity } from './device-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceTypesEntity])],
})
export class DeviceTypesModule {}
