import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Keyword } from 'src/keyword/keyword.entity';

@Entity()
export class Cafe {
  // ID를 고유값으로 자동 생성
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  address: string;

  @Column({ nullable: true })
  roadAddress: string;

  @Column()
  mapx: string;

  @Column()
  mapy: string;

  @ManyToMany(() => Keyword, (keyword) => keyword.cafes)
  keywords: Keyword[];
}
