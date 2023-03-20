import { type } from "os";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: string;

    @Column({length: "100"})
    name: string;
    
    @Column({length: "100", unique: true})
    email: string;

    @Column({length: "100"})
    password: string;

    @Column({type: "boolean", default: true})
    active: boolean;

    @CreateDateColumn()
    createdOn: Date;
}