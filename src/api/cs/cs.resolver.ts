import { Args, Query, Resolver } from '@nestjs/graphql';
import { CsService } from './cs.service';
import { CsType } from './types/cs-type';
import LoginArgs from '../_common/dto/login.args';
import GetCsArgs from './dto/get-cs.args';

@Resolver()
export class CsResolver {
  constructor(private userService: CsService) { }
  @Query(() => CsType)
  async getCs(@Args() args: GetCsArgs) {

    return this.userService.getUser({ ykiho: args.ykiho, saupkiho: args.saupkiho });
  }
}
