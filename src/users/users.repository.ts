import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
    private id = 3;
    private users: User[] = [
        {
            id: 1,
            name: 'Yiming',
        },
        {
            id: 2,
            name: 'Greg',
        },
    ];

    async save(user: Omit<User, 'id'>) {
        this.users.push({ ...user, id: this.id++ });
    }

    async delete(userId: number) {
        this.users = this.users.filter(user => user.id !== userId);
    }

    async update(id: number, updatedUser: Partial<User>) {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            return;
        }

        Object.assign(user, updatedUser);
    }

    async find():Promise<User[]> {
        return this.users;
    }
}