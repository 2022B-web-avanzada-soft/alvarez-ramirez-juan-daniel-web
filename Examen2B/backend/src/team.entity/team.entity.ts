import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    stadium: string;

    @Column()
    isLocal: boolean;
}
