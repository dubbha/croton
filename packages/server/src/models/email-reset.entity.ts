import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class EmailReset {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public emailResetToken: string;

  @Column('bigint')
  public expiresIn: number;
}
