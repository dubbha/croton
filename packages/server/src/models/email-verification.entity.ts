import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  emailVerificationToken: string;

  @Column('bigint')
  expiresIn: number;
}
