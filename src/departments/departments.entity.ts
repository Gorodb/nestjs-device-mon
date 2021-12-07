import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { DevicesEntity } from '../devices/devices.entity';

@Entity()
export class DepartmentsEntity {
  @OneToMany(() => DevicesEntity, (device) => device.id)
  @OneToMany(() => UsersEntity, (user) => user.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;
}
