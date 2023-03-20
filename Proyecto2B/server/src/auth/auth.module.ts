import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/user.entity';
import { EncoderService } from './encoder.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true}),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersRepository, EncoderService, JwtStrategy],
  controllers: [AuthController],
  exports: [ JwtStrategy, PassportModule]
})
export class AuthModule {}
