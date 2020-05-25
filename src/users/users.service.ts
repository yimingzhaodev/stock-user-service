import { Injectable } from '@nestjs/common';
// import { User } from './interfaces/user.interface';
import { UsersRepository } from './users.repository';
import { UserEntity } from './model/user.entity'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {ResponseUserDto} from "./dto/response.user.dto";
import {User} from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

  add(user: Omit<User, 'id'>): void {
    this.userRepo.save(user).then(r => console.log(r));
  }

  async update(userId: number, updatedUser: Partial<User>): Promise<UpdateResult> {
    return await this.userRepo.update(userId, updatedUser);
  }
  //
  // remove(userId: number): void {
  //   this.userRepo.remove(userId);
  // }
  //
  async findAll(): Promise<ResponseUserDto[]> {
    return await this.userRepo.find()
        .then(users => users.map(user => ResponseUserDto.fromEntity(user)));
  }
}
