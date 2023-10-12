import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from 'src/entities/cpm/account.entity';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

}
