import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../auth/dto/register-user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<{ id: string }> {
    const user = this.create({ name, email, password });

    try {
      await this.save(user);
      return { id: user.id };
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Este email ya existe');
      }

      throw new InternalServerErrorException();
    }
  }

  async updateUser(user: any): Promise<void> {
    try {
      await this.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Ocurrio un error');
      }

      throw new InternalServerErrorException();
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = {
      where: { email },
    };
    return this.findOne(options);
  }
}
