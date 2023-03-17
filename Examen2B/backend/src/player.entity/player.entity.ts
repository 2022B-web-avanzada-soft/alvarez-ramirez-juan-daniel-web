import { TeamEntity } from 'src/team.entity/team.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    age: number;

    @Column()
    number: number;

    @Column()
    isStarter: boolean;

    @ManyToOne(() => TeamEntity, { nullable: true })
    @JoinColumn()
    team: TeamEntity;
}
