import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { DevicesEntity } from '../devices/devices.entity';
import { BaseEntity } from '../baseEntity/BaseEntity';

@Entity()
export class DepartmentsEntity extends BaseEntity {
  @OneToMany(() => DevicesEntity, (device) => device.id)
  @OneToMany(() => UsersEntity, (user) => user.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
