import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  add(user: Omit<User, 'id'>): void {
    this.userRepo.add(user);
  }

  update(userId: number, updatedUser: Partial<User>): void {
    this.userRepo.update(userId, updatedUser);
  }

  remove(userId: number): void {
    this.userRepo.remove(userId);
  }

  findAll(): User[] {
    return this.userRepo.findAll();
  }
}
