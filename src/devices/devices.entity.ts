import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Departments } from '../departments/departments.entity';
import { Users } from '../users/entities/users.entity';
import { DeviceTypes } from '../device-types/device-types.entity';

@Entity()
export class Devices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @ManyToOne(() => Users, (user) => user.id)
  owner: string;

  @Column()
  @ManyToOne(() => Users, (user) => user.id)
  updatedByUser: string;

  @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.id)
  deviceType: DeviceTypes;

  @Column()
  osName: string;

  @Column()
  defaultLocation: string;

  @ManyToOne(() => Departments, (department) => department.id)
  department: Departments;

  @Column()
  currentLocation: string;

  @Column()
  charge: string;
}
