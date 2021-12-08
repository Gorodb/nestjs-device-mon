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

  @ManyToOne(() => Users, (user) => user.id)
  ownerId: Users;

  @ManyToOne(() => Users, (user) => user.id)
  updatedByUser: Users;

  @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.id)
  deviceTypeId: DeviceTypes;

  @Column()
  osName: string;

  @Column()
  defaultLocation: string;

  @ManyToOne(() => Departments, (department) => department.id)
  departmentId: Departments;

  @Column()
  currentLocation: string;

  @Column()
  charge: string;
}
