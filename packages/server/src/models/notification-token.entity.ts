import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user.entity';

@Entity()
export default class NotificationToken {
  @PrimaryGeneratedColumn()
  notificationTokenId: number;

  @Column()
  registrationToken: string;

  @Column('bigint')
  registrationTokenLastUpdate: number;

  @ManyToOne(() => User, user => user.notificationTokens, { onDelete: 'CASCADE' })
  user: User;
}
