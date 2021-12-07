import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesEntity } from './devices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesEntity])],
})
export class DevicesModule {}
