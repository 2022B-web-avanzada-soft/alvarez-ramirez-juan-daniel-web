import { IsNotEmpty, IsEmail, Min, MAX, Max } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password?: string;
}