import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/cpm/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountResolver, AccountService],
  exports: [AccountService]
})
export class AccountModule { }
