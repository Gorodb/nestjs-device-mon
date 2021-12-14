import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTypes } from './device-types.entity';
import { DeviceTypesController } from './device-types.controller';
import { DeviceTypesService } from './device-types.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceTypes]), UsersModule],
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService],
})
export class DeviceTypesModule {}
