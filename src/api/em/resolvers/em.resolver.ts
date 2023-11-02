import { Query, Resolver } from '@nestjs/graphql';
import { Em } from 'src/entities/cpm/em.entity';
import { UseGuards } from '@nestjs/common';
import { GetGqlUser } from 'src/decorators/get-user';
import { User } from '../../auth/types/user';
import { EmService } from '../services/em.service';
import { GqlAuthGuard } from 'src/api/auth/guards/gql.auth.guard';

@Resolver(() => Em)
export class EmResolver {
  constructor(private readonly emService: EmService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Em])
  async getManagers(@GetGqlUser() user: User) {
    return await this.emService.getManagers(user.jisa);
  }
}
