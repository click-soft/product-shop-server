import { Query, Resolver } from '@nestjs/graphql';
import { EmService } from './em.service';
import { Em } from 'src/entities/cpm/em.entity';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetGqlUser } from 'src/decorators/get-user';
import { User } from '../auth/types/user';

@Resolver(() => Em)
export class EmResolver {
  constructor(private readonly emService: EmService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Em])
  async getManagers(@GetGqlUser() user : User) {
    return await this.emService.getManagers(user.jisa);
  }
}
