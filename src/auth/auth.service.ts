import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { User } from 'src/typeorm/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async userSignUp(authDto: AuthDto) {
    const users = await this.usersService.findUsers(authDto.email);
    if (users.length) {
      throw new BadRequestException('User email already exists!');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(authDto.password, salt);

    const object: CreateUserDto = {
      email: authDto.email,
      username: authDto.username,
      password: hash,
    };

    return this.usersService.createUser(object);
  }

  async userSignIn(authDto: Partial<AuthDto>) {
    const [users]: User[] = await this.usersService.findUsers(authDto.email);

    if (!users) {
      throw new BadRequestException('User email not found!');
    }

    const compare = await bcrypt.compare(authDto.password, users.password);

    if (!compare) {
      throw new BadRequestException('Password is incorrect!');
    }

    return users;
  }
}
