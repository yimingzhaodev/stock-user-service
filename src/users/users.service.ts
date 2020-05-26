import {Injectable} from '@nestjs/common';
import {UserEntity} from './model/user.entity'
import {DeleteResult, UpdateResult} from "typeorm";
import {ResponseUserDto} from "./dto/response.user.dto";
import {UserRepository} from "./user.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UserRepository) {
    }

    add(user: Omit<UserEntity, 'id'>): void {
        this.usersRepository.save(user).then(r => console.log(r));
    }

    async update(userId: number, updatedUser: Partial<UserEntity>): Promise<UpdateResult> {
        return await this.usersRepository.update(userId, updatedUser);
    }

    async remove(userId: number): Promise<DeleteResult> {
        return await this.usersRepository.delete(userId);
    }

    async findAll(): Promise<ResponseUserDto[]> {
        return await this.usersRepository.find()
            .then(users => users.map(user => ResponseUserDto.fromEntity(user)));
    }
}
