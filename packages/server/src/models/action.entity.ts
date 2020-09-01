import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Actions } from '../constants/actions';
import Flower from './flower.entity';
import User from './user.entity';

@Entity()
export default class Action {
  @PrimaryGeneratedColumn()
  actionId: number;

  @Column('bigint')
  timestamp: number;

  @Column({ type: 'simple-enum', enum: Actions })
  action: Actions;

  @ManyToOne(() => Flower, flower => flower.actions, { onDelete: 'CASCADE' })
  flower: Flower;

  @ManyToOne(() => User, user => user.actions, { onDelete: 'CASCADE' })
  user: User;
}
