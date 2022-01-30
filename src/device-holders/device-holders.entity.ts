import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base-entity/base-entity';
import { Users } from '../users/entities/users.entity';
import { Devices } from '../devices/devices.entity';

@Entity()
export class DeviceHolders extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  currentUser: Users;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  previousUser: Users;

  @ManyToOne(() => Devices, (device) => device.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  device: Devices;
}
