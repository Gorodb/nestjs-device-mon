import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DevicesEntity } from '../devices/devices.entity';

@Entity()
export class DeviceTypesEntity {
  @OneToMany(() => DevicesEntity, (device) => device.id)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deviceType: string;

  @Column()
  title: string;
}
