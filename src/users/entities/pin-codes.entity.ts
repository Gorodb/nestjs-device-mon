import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { BaseEntity } from '../../base-entity/base-entity';
import { Actions } from '../enums/actions.enum';

@Entity()
export class PinCodes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToOne(() => Users, (user: Users) => user.id)
  user: string;

  @Column({
    default: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
  })
  pincode: number;

  @Column({ type: 'enum', enum: Actions })
  action: Actions;

  @Column({ type: 'bigint' })
  expirationDate;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;
}
