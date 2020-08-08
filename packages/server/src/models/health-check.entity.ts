import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class HealthCheck {
  @PrimaryGeneratedColumn()
  id: number;
}
