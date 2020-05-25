import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/response.user.dto';
import {CreateUserDTO} from "./dto/create.users.dto";
import {DeleteResult, UpdateResult} from "typeorm";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async get(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Post()
  async add(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    this.usersService.add(createUserDTO);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createUserDTO: CreateUserDTO): Promise<UpdateResult> {
    return this.usersService.update(id, createUserDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }
}
