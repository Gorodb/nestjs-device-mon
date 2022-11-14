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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Devices, (device: Devices) => device.owner, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  owner: string[];

  @Column({
    unique: true,
    comment: 'Login should be unique',
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 100, default: null })
  name: string;

  @Column({ length: 100, default: '' })
  location: string;

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

  @ManyToOne(() => Departments, (department) => department.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  department: Departments;

  @Column({ default: null, type: 'json' })
  logo: FileElementResponseDto;

  @Column({ default: false })
  @Exclude()
  verified: boolean;
}
