import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  address: string;

  @Column({ nullable: true })
  roadAddress: string;

  @Column()
  mapx: string;

  @Column()
  mapy: string;
}
