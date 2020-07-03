import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  public status: string;

  @Column({ nullable: true })
  public facebookId?: string;

  @Column({ nullable: true })
  public googleId?: string;
}
