import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    public users: User[] = [
        {
            id: 1,
            name: "Yiming",
        },
        {
            id: 2,
            name: "Greg",
        }
    ];

    add(user: User) {
        this.users.push(user);
    }

    update(userId: number, updatedUser: Partial<User>){
        const user = this.users.find(user => user.id === userId);

        if(!user) {
            return;
        }

        Object.assign(user, updatedUser);
    }

    remove(userId: number) {
        this.users = this.users.filter(user => user.id !== userId);
    }
    
    findAll(): User[] {
        return this.users;
    }
}