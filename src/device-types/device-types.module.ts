import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTypesController } from './device-types.controller';
import { DeviceTypesService } from './device-types.service';
import { UsersModule } from '../users/users.module';
import { DeviceTypesRepository } from './device-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceTypesRepository]), UsersModule],
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService],
})
export class DeviceTypesModule {}
