import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('id/:id')
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUsersById(id);
  }

  @Get('email/:email')
  findUsers(@Param('email') email: string) {
    return this.usersService.findUsers(email);
  }
}
