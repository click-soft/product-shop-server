import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from '../services/account.service';
import SaveAccountArgs from '../dto/save-account.args';
import { Account } from 'src/entities/cpm/account.entity';
import SendChangePasswordEmailArgs from '../dto/send_change_password_email.args';
import { ValidChangePasswordArgs } from '../dto/valid-change-password.args';
import ChangePasswordArgs from '../dto/change-password.args';
import { UpdateResult } from 'src/api/_common/types/update-result';
import VerifyAccountArgs from '../dto/verify-account.args';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/api/auth/guards/gql.auth.guard';
import { GetGqlUser } from 'src/decorators/get-user';
import { User } from 'src/api/auth/types/user';
import ChangeEmailArgs from '../dto/change-email.args';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Account)
  async getAccount(@Args('userId') userId: string): Promise<Account> {
    return await this.accountService.findOne(userId);
  }

  @Query(() => Account)
  async verifyAccount(@Args() args: VerifyAccountArgs) {
    return await this.accountService.verifyAccount(args);
  }

  @Query(() => Boolean!)
  async validChangePassword(@Args() args: ValidChangePasswordArgs) {
    return await this.accountService.validChangePassword(args);
  }

  @Mutation(() => Account)
  async saveAccount(@Args() args: SaveAccountArgs) {
    return await this.accountService.saveAccount(args);
  }

  @Mutation(() => String!)
  async sendChangePasswordEmail(@Args() args: SendChangePasswordEmailArgs) {
    return await this.accountService.sendChangePasswordEmail(args);
  }

  @Mutation(() => UpdateResult)
  async changePassword(@Args() args: ChangePasswordArgs) {
    return await this.accountService.changePassword(args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateResult)
  async changeEmail(@GetGqlUser() user: User, @Args() args: ChangeEmailArgs) {
    return await this.accountService.changeEmail(user.userId, args.newEmail);
  }
}
