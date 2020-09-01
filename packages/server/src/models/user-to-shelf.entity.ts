import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user.entity';
import Shelf from './shelf.entity';

@Entity()
export default class UserToShelf {
  @PrimaryGeneratedColumn()
  userToShelfId: number;

  @Column()
  userId: number;

  @Column()
  shelfId: string;

  @Column()
  isAdmin: boolean;

  @Column()
  order: number;

  @ManyToOne(() => User, user => user.userToShelf, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Shelf, shelf => shelf.userToShelf, { onDelete: 'CASCADE' })
  shelf: Shelf;
}
