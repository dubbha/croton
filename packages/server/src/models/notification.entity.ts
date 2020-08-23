import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Actions } from '../constants/actions';
import Flower from './flower.entity';

@Entity()
export default class Notification {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column('bigint')
  timestamp: number;

  @Column({ type: 'simple-enum', enum: Actions })
  action: Actions;

  @ManyToOne(() => Flower, flower => flower.notifications, { onDelete: 'CASCADE' })
  flower: Flower;
}
