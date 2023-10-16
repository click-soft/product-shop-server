import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/cpm/account.entity';
import { CsService } from '../cs/cs.service';
import { Cs } from 'src/entities/cpm/cs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Cs])],
  providers: [AccountResolver, AccountService, CsService],
  exports: [AccountService]
})
export class AccountModule { }
