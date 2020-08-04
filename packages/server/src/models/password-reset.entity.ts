import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  passwordResetToken: string;

  @Column('bigint')
  expiresIn: number;
}
