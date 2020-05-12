import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    public readonly users: User[] = [];

    addUser(user: User) {
        this.users.push(user);
    }
    
    getAllUsers(): User[] {
        return this.users;
    }
}