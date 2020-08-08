import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Actions } from '../constants/actions';
import Shelf from './shelf.entity';

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
}
