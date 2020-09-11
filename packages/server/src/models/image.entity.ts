import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Flower from './flower.entity';

@Entity()
export default class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @ManyToOne(() => Flower, flower => flower.images, { onDelete: 'CASCADE' })
  flower: Flower;
}
