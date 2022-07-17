import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Login } from 'src/entity/login.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Login])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
