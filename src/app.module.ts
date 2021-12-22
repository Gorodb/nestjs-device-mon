import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { DeviceTypesModule } from './device-types/device-types.module';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';
import { DeviceHoldersModule } from './device-holders/device-holders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      }),
    }),
    DepartmentsModule,
    UsersModule,
    DevicesModule,
    DeviceTypesModule,
    MailModule,
    FilesModule,
    DeviceHoldersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
