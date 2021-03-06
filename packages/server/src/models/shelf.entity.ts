import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Flower from './flower.entity';
import ShelfInvitation from './shelf-invitation.entity';
import UserToShelf from './user-to-shelf.entity';

@Entity()
export default class Shelf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  pictureUrl: string;

  @OneToMany(() => Flower, flower => flower.shelf)
  flowers: Flower[];

  @OneToMany(() => ShelfInvitation, invitation => invitation.shelf)
  invitations: ShelfInvitation[];

  @OneToMany(() => UserToShelf, userToShelf => userToShelf.user)
  userToShelf: UserToShelf[];
}
