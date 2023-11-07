import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from '../services/account.service';
import SaveAccountArgs from '../dto/save-account.args';
import { Account } from 'src/entities/cpm/account.entity';
import SendChangePasswordEmailArgs from '../dto/send_change_password_email.args';
import { ValidChangePasswordArgs } from '../dto/valid-change-password.args';
import ChangePasswordArgs from '../dto/change-password.args';
import { UpdateResult } from 'src/api/_common/types/update-result';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Account)
  async getAccount(@Args('userId') userId: string): Promise<Account> {
    return this.accountService.findOne(userId);
  }

  @Mutation(() => Account)
  async saveAccount(@Args() args: SaveAccountArgs) {
    return await this.accountService.saveAccount(args);
  }

  @Mutation(() => String!)
  async sendChangePasswordEmail(@Args() args: SendChangePasswordEmailArgs) {
    return await this.accountService.sendChangePasswordEmail(args);
  }

  @Query(() => Boolean!)
  async validChangePassword(@Args() args: ValidChangePasswordArgs) {
    return await this.accountService.validChangePassword(args);
  }

  @Mutation(() => UpdateResult)
  async changePassword(@Args() args: ChangePasswordArgs) {
    return await this.accountService.changePassword(args);
  }
}
