import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { Response, Request } from 'express';
import { GqlAuthGuard } from "./gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { GetGqlUser, GetUser } from "src/decorators/get-user";
import { User } from "./types/user";
import { MessageResult } from "../_common/types/message-result";
import LoginArgs from "../_common/dto/login.args";
import TokenResult from "./types/token-result";

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUser(@GetGqlUser() user: User) {
    return user;
  }

  @Mutation(() => TokenResult)
  async login(
    @Args() args: LoginArgs) {

    const result = await this.authService.login(args);
    return result;
  }
  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResult)
  async logout(@GetGqlUser() user: User) {

    await this.authService.logout(user.ykiho)

    return {
      message: 'success'
    }
  }

  @Mutation(() => TokenResult)
  async refresh(@Args('key') key: string) {
    return await this.authService.refresh(key);
  }
}