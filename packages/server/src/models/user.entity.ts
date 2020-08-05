import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserStatuses } from '../constants/user-statuses';
import SocialProfile from './social-profile.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column('simple-enum')
  public status: UserStatuses;

  @OneToOne(() => SocialProfile, { nullable: true })
  @JoinColumn()
  public socialProfile?: SocialProfile;
}
