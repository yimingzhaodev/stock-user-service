import { User } from '../interfaces/user.interface';
export class UsersResponseDTO {
  public readonly users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}
