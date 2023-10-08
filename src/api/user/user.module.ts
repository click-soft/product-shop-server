import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cs } from '../../entities/cpm/cs.entity';
import { UserResolver } from './user.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([Cs]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})

export class UserModule { }
