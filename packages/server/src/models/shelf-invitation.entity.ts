import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Shelf from './shelf.entity';

@Entity()
export default class ShelfInvitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userEmail: string;

  @Column()
  shelfInvitationToken: string;

  @Column('bigint')
  expiresIn: number;

  @ManyToOne(() => Shelf, shelf => shelf.invitations, { onDelete: 'CASCADE' })
  shelf: Shelf;
}
