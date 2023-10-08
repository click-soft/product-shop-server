import { Args, Query, Resolver } from '@nestjs/graphql';
import { CsType } from 'src/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }
  @Query()
  async getCs(@Args("ykiho") ykiho?: string, @Args("saupkiho") saupkiho?: string): Promise<CsType> {
    return this.userService.getUser({ ykiho, saupkiho });
  }
}
