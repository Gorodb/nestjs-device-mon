import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersRoles } from '../enums/users-roles.enum';
import { Departments } from '../../departments/departments.entity';
import { Devices } from '../../devices/devices.entity';
import { PinCodes } from './pin-codes.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../base-entity/base-entity';
import { FileElementResponseDto } from '../../files/dto/file-element-response.dto';

@Entity()
export class Users extends BaseEntity {
  @OneToMany(() => PinCodes, (pinCode: PinCodes) => pinCode.user)
  @OneToMany(() => Devices, (device: Devices) => device.owner)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    comment: 'Логин должен быть уникальным',
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 100, default: null })
  name: string;

  @Column({
    type: 'enum',
    enum: UsersRoles,
    default: UsersRoles.USER,
  })
  role: UsersRoles;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  description: string;

  @Column({ type: 'uuid', default: null })
  @ManyToOne(() => Departments, (department) => department.id)
  department: string;

  @Column({ default: null, type: 'json' })
  logo: FileElementResponseDto; // JSON<FileElementResponseDto>;

  @Column({ default: false })
  @Exclude()
  verified: boolean;
}
