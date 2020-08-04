import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import User from './user.entity';

@Entity()
export default class SocialProfile {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public pictureUrl: string;

  @Column({ update: false, nullable: true })
  public facebookId?: string;

  @Column({ update: false, nullable: true })
  public googleId?: string;

  @OneToOne(() => User)
  public user: User;
}
