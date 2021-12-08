import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersRoles } from '../enums/users.roles';
import { Departments } from '../../departments/departments.entity';
import { Devices } from '../../devices/devices.entity';
import { PinCodes } from './pinCodes.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../baseEntity/BaseEntity';

@Entity()
export class Users extends BaseEntity {
  @OneToMany(() => PinCodes, (pinCode: PinCodes) => pinCode.user)
  @OneToMany(() => Devices, (device: Devices) => device.ownerId)
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

  @ManyToOne(() => Departments, (department) => department.id)
  departmentId: Departments;

  @Column({ default: null })
  logo: string;

  @Column({ default: false })
  @Exclude()
  verified: boolean;
}
