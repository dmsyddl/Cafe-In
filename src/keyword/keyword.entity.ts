import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Cafe } from "../cafe/cafe.entity";

@Entity()
export class Keyword {
    //ID를 고유값으로 생성
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @ManyToMany(() => Cafe, (cafe) => cafe.keywords)
    @JoinTable()
    cafes: Cafe[];
}