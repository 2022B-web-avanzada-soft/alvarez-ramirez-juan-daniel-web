import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto } from './dto/register-user.dto';
import { LoginDTO } from './dto/login-user.dto';
import { EncoderService } from './encoder.service';
import { JwtPayload } from './jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  private readonly invalidTokens: string[] = [];
  constructor(
    private readonly usersRepository: UsersRepository,
    private encoderService: EncoderService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDTO: CreateUserDto): Promise<{ id: string }> {
    const { name, email, password } = registerUserDTO;
    const hashedPassword = await this.encoderService.encodePassword(password);
    return this.usersRepository.createUser(name, email, hashedPassword);
  }

  async login(loginDTO: LoginDTO): Promise<{ id: string }> {
    const { email, password } = loginDTO;
    const user = await this.usersRepository.findByEmail(email);
    if (
      user &&
      (await this.encoderService.checkPassword(password, user.password))
    ) {
      const payload: JwtPayload = { id: user.id, email, active: user.active };
      const accessToken = await this.jwtService.sign(payload);

      return { id: user.id };
    }

    throw new UnauthorizedException('Por favor revisa tus credenciales');
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { name, email, password } = updateUserDTO;
    const hashedPassword = await this.encoderService.encodePassword(password);
    const userUpdate = { name, email, hashedPassword };
    Object.assign(user, userUpdate);
    return this.usersRepository.updateUser(user);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
