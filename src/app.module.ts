import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AppService } from './app.service';

@Module({ 
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
