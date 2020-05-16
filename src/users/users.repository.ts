import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UsersRepository {
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

    remove(userId: number) {
        this.users = this.users.filter(user => user.id !== userId);
    }

    update(id: number, updatedUser: Partial<User>) {
        const user = this.users.find(user => user.id === id);

        if(!user) {
            return;
        }

        Object.assign(user, updatedUser);

    }


    find(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }


    findAll(): User[] {
        return this.users;
    }

}