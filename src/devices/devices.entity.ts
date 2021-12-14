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

  @Column({ type: 'uuid', default: null })
  @ManyToOne(() => Users, (user) => user.id)
  owner: Users;

  @Column()
  @ManyToOne(() => Users, (user) => user.id)
  updatedByUser: string;

  @Column({ type: 'uuid', default: null })
  @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.id)
  deviceType: DeviceTypes;

  @Column()
  osName: string;

  @Column()
  defaultLocation: string;

  @Column({ type: 'uuid', default: null })
  @ManyToOne(() => Departments, (department) => department.id)
  department: Departments;

  @Column()
  currentLocation: string;

  @Column()
  charge: string;
}
