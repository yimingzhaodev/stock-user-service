import { Controller, Get } from '@nestjs/common';
import { UsersResponseDTO } from './users.response.dto';

@Controller('users')
export class UsersController {
    
  @Get()
  getUsers(): UsersResponseDTO {
    return new UsersResponseDTO([{ name: 'Yiming' }, { name: 'Greg' }]);
  }
}
