import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Keyword {
    //ID를 고유값으로 생성
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}