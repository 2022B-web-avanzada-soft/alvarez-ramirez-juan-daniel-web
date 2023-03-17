import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './player/player.controller';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './player.entity/player.entity';
import { TeamController } from './team/team.controller';
import { TeamEntity } from './team.entity/team.entity';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([PlayerEntity, TeamEntity]),
    ],
    controllers: [AppController, PlayerController, TeamController],
    providers: [AppService],
})
export class AppModule {}
