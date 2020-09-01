import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Actions } from '../constants/actions';
import Shelf from './shelf.entity';
import Action from './action.entity';
import Notification from './notification.entity';

@Entity()
export default class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  pictureUrls: string[];

  @Column('simple-json')
  rrules: { [key in Actions]: string }

  @ManyToOne(() => Shelf, shelf => shelf.flowers, { onDelete: 'CASCADE' })
  shelf: Shelf;

  @OneToMany(() => Action, action => action.flower)
  actions: Action[];

  @OneToMany(() => Notification, notification => notification.flower)
  notifications: Notification[];
}
