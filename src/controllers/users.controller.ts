import { Controller, Get } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService : UsersService) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
