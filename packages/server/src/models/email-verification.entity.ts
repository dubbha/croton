import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class EmailVerification {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public emailVerificationToken: string;

  @Column('bigint')
  public expiresIn: number;
}
