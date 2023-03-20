import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { User } from "src/users/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private readonly authService: AuthService,
    ){

        super({
            secretOrKey: 'super-secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });

        

    }

    async validate(payload: JwtPayload): Promise<User>{

       

        const {email} = payload;
        const user = this.usersRepository.findByEmail(email);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }

   
}

export { Strategy };
