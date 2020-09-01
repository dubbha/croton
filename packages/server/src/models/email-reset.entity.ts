import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class EmailReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  emailResetToken: string;

  @Column('bigint')
  expiresIn: number;
}
