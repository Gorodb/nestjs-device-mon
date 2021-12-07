import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersRoles } from './enums/users.roles';
import { Departments } from '../departments/departments.entity';
import { Devices } from '../devices/devices.entity';

@Entity()
export class Users {
  @OneToMany(() => Devices, (device: Devices) => device.ownerId)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    comment: 'Логин должен быть уникальным',
  })
  email: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: UsersRoles,
    default: UsersRoles.USER,
  })
  role: UsersRoles;

  @Column()
  phone: string;

  @Column()
  description: string;

  @ManyToOne(() => Departments, (department) => department.id)
  departmentId: Departments;

  @Column({ default: null })
  logo: string;
}
