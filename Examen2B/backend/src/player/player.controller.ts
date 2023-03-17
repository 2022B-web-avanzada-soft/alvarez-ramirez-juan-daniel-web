import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from '../player.entity/player.entity';

@Controller('player')
export class PlayerController {
    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>,
    ) {}

    @Get()
    async findAll(@Query('team') team?: string): Promise<PlayerEntity[]> {
        const queryBuilder = this.playerRepository.createQueryBuilder('player');
        if (team) {
            queryBuilder.where('player.team = :team', { team });
        }
        return queryBuilder.getMany();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PlayerEntity> {
        // Search for the player with the given id
        const player = await this.playerRepository.findOne({
            where: { id: id },
        });
        return player;
    }

    @Post()
    async create(@Body() player: PlayerEntity): Promise<PlayerEntity> {
        return this.playerRepository.save(player);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() player: PlayerEntity,
    ): Promise<PlayerEntity> {
        const playerFound = await this.playerRepository.findOne({
            where: { id: id },
        });
        for (const key in player) {
            playerFound[key] = player[key];
        }
        return this.playerRepository.save(playerFound);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.playerRepository.delete(id);
    }
}
