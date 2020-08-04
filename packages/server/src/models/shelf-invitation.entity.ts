import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ShelfInvitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userEmail: string;

  @Column()
  shelfId: number;

  @Column()
  shelfInvitationToken: string;

  @Column('bigint')
  expiresIn: number;
}
