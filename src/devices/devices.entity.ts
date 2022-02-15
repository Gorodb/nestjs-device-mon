import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Departments } from '../departments/departments.entity';
import { Users } from '../users/entities/users.entity';
import { DeviceTypes } from '../device-types/device-types.entity';
import { BaseEntity } from '../base-entity/base-entity';

@Entity()
export class Devices extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  owner: Users;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  heldByUser: Users;

  @ManyToOne(() => Users, (user) => user.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  previousUser: Users;

  @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.id, { eager: true })
  deviceType: DeviceTypes;

  @Column()
  osName: string;

  @Column()
  defaultLocation: string;

  @ManyToOne(() => Departments, (department) => department.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  department: Departments;

  @Column({ nullable: true, default: null })
  currentLocation: string;

  @Column({ nullable: true, default: null })
  charge: string;

  @Column({ nullable: true, default: null })
  inventoryNumber: string;
}
