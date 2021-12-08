import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';
import { BaseEntity } from '../../baseEntity/BaseEntity';
import { Actions } from '../enums/actions';

@Entity()
export class PinCodes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user: Users) => user.id)
  user: string;

  @Column()
  pincode: string;

  @Column({ type: 'enum', enum: Actions })
  action: Actions;

  @Column({ type: 'bigint' })
  expirationDate;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;
}
