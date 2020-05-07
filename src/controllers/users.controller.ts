import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUsers() : object[] {
        return [
            {'name': 'Yiming'},
            {'name': 'Greg'}
        ];
    }
}