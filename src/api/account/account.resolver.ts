import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from 'src/entities/cpm/account.entity';
import SaveAccountArgs from './dto/save-account.args';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Query(() => Account)
  async getAccount(@Args("userId") userId: string): Promise<Account> {
    return this.accountService.findOne(userId);
  }

  @Mutation(() => Account)
  async saveAccount(@Args() args: SaveAccountArgs) {
    return await this.accountService.saveAccount(args);
  }
}
