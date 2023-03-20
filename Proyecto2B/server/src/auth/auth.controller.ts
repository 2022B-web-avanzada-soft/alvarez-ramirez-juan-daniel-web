import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-user.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerUserDTO: CreateUserDto): Promise<{ id: string }> {
    return this.authService.registerUser(registerUserDTO);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO): Promise<{ id: string }> {
    return this.authService.login(loginDTO);
  }

  @Delete('/logout')
  async logout(@Req() req) {
    req.logout();
    return { message: 'Logged out successfully' };
  }

  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateDTO: UpdateUserDto,
  ): Promise<void> {
    return this.authService.updateUser(id, updateDTO);
  }

  @Get('/user/:id')
  getUsers(@Param('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }
}
