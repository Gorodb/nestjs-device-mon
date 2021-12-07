import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentsEntity } from '../departments/departments.entity';
import { UsersEntity } from '../users/users.entity';
import { DeviceTypesEntity } from '../device-types/device-types.entity';

@Entity()
export class DevicesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  ownerId: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  updatedByUser: UsersEntity;

  @ManyToOne(() => DeviceTypesEntity, (deviceType) => deviceType.id)
  deviceTypeId: DeviceTypesEntity;

  @Column()
  osName: string;

  @Column()
  defaultLocation: string;

  @ManyToOne(() => DepartmentsEntity, (department) => department.id)
  departmentId: DepartmentsEntity;

  @Column()
  currentLocation: string;

  @Column()
  charge: string;
}
