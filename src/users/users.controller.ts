import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async get(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Post()
  async add(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    this.usersService.add(createUserDTO);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createUserDTO: CreateUserDTO): Promise<void> {
    this.usersService.update(id, createUserDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    this.usersService.remove(id);
  }
}
