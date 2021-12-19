import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Devices } from '../devices/devices.entity';
import { BaseEntity } from '../base-entity/base-entity';

@Entity()
export class DeviceTypes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deviceType: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Devices, (device) => device.id)
  devices: Devices[];
}
