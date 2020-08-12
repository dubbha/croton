import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import User from './user.entity';

@Entity()
export default class SocialProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pictureUrl: string;

  @Column({ update: false, nullable: true })
  facebookId?: string;

  @Column({ update: false, nullable: true })
  googleId?: string;

  @OneToOne(() => User, user => user.socialProfile)
  user: User;
}
