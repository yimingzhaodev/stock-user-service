import { Controller, Get } from '@nestjs/common';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
    @Get()
    getUsers() : User[] {
        return [
            {'name': 'Yiming'},
            {'name': 'Greg'}
        ];
    }
}