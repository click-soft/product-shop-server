import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CsType } from './types/cs-type';
import LoginArgs from '../_common/dto/login.args';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }
  @Query(() => CsType)
  async getCs(@Args() arg: LoginArgs) {

    return this.userService.getUser({ ykiho: arg.ykiho, saupkiho: arg.saupkiho });
  }
}
