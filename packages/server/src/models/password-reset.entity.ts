import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class PasswordReset {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public passwordResetToken: string;

  @Column('bigint')
  public expiresIn: number;
}
