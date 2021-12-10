import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @Exclude()
  @CreateDateColumn()
  created;

  @Exclude()
  @UpdateDateColumn()
  updated;
}
