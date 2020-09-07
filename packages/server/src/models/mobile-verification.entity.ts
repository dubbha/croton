import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class MobileVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  mobileVerificationToken: string;

  @Column('bigint')
  expiresIn: number;
}
