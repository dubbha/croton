import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { UserStatuses } from '../constants/user-statuses';
import SocialProfile from './social-profile.entity';
import UserToShelf from './user-to-shelf.entity'
import Action from './action.entity';
import NotificationToken from './notification-token.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'simple-enum', enum: UserStatuses })
  status: UserStatuses;

  @OneToOne(() => SocialProfile, { nullable: true })
  @JoinColumn()
  socialProfile?: SocialProfile;

  @OneToMany(() => UserToShelf, userToShelf => userToShelf.user)
  userToShelf: UserToShelf[];

  @OneToMany(() => Action, actions => actions.user)
  actions: Action[];

  @OneToMany(() => NotificationToken, notificationToken => notificationToken.user)
  notificationTokens: NotificationToken[];
}
