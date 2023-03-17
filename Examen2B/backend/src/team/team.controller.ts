import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from 'src/team.entity/team.entity';
import { Repository } from 'typeorm';

@Controller('team')
export class TeamController {
    constructor(
        @InjectRepository(TeamEntity)
        private teamRepository: Repository<TeamEntity>,
    ) {}

    @Get()
    async findAll(): Promise<TeamEntity[]> {
        return this.teamRepository.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TeamEntity> {
        // Search for the player with the given id
        const player = await this.teamRepository.findOne({
            where: { id: id },
        });
        return player;
    }

    @Post()
    async create(@Body() team: TeamEntity): Promise<TeamEntity> {
        // if team id is not given, remove it from the object
        if (!team.id) {
            delete team.id;
        }
        console.log(team)
        return this.teamRepository.save(team);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() team: TeamEntity,
    ): Promise<TeamEntity> {
        const playerFound = await this.teamRepository.findOne({
            where: { id: id },
        });
        for (const key in team) {
            playerFound[key] = team[key];
        }
        return this.teamRepository.save(playerFound);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.teamRepository.delete(id);
    }
}
