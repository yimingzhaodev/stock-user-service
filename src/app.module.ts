import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {configService} from "./config/config.service";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
})
export class AppModule {}
