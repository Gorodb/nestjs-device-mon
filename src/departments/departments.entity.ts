import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { Devices } from '../devices/devices.entity';
import { BaseEntity } from '../base-entity/base-entity';

@Entity()
export class Departments extends BaseEntity {
  @OneToMany(() => Devices, (device) => device.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Users, (user) => user.id)
  users: Users[];
}
