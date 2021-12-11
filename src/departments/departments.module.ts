import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsRepository } from './departments.repository';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DepartmentsRepository]),
    UsersModule,
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [],
})
export class DepartmentsModule {}
