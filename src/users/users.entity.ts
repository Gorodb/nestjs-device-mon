import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersRoles } from './enums/users.roles';
import { DepartmentsEntity } from '../departments/departments.entity';
import { DevicesEntity } from '../devices/devices.entity';

@Entity()
export class UsersEntity {
  @OneToMany(() => DevicesEntity, (device) => device.ownerId)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    comment: 'Логин должен быть уникальным',
  })
  email: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: UsersRoles,
    default: UsersRoles.USER,
  })
  role: UsersRoles;

  @Column()
  phone: string;

  @Column()
  description: string;

  @ManyToOne(() => DepartmentsEntity, (department) => department.id)
  departmentId: DepartmentsEntity;

  @Column({ default: null })
  logo: string;
}
