import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService : UsersService) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Post()
  async add(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    this.usersService.add(createUserDTO);
  }
}
