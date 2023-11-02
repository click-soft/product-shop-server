import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Cs } from 'src/entities/cpm/cs.entity';
import { Em } from 'src/entities/cpm/em.entity';
import { CsService } from '../services/cs.service';
import { EmService } from 'src/api/em/services/em.service';
import { CsType } from '../types/cs-type';
import GetCsArgs from '../dto/get-cs.args';

@Resolver(() => Cs)
export class CsResolver {
  constructor(private csService: CsService, private emService: EmService) {}
  @Query(() => CsType)
  async getCs(@Args() args: GetCsArgs) {
    return this.csService.getUser({
      ykiho: args.ykiho,
      saupkiho: args.saupkiho,
    });
  }

  @ResolveField(() => Em)
  async em(@Parent() cs: Cs) {
    return await this.emService.find(cs.emCode);
  }
}
