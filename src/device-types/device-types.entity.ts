import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Devices } from '../devices/devices.entity';

@Entity()
export class DeviceTypes {
  @OneToMany(() => Devices, (device) => device.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deviceType: string;

  @Column()
  title: string;
}
