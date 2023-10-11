import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { Response, Request } from 'express';
import { GqlAuthGuard } from "./gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { GetGqlUser, GetUser } from "src/decorators/get-user";
import { User } from "./types/user";
import { MessageResult } from "../_common/types/message-result";
import LoginArgs from "../_common/dto/login.args";

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) { }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getUser(@GetGqlUser() user: User) {
    return user;
  }

  @Mutation(() => MessageResult)
  async login(
    @Args() args: LoginArgs,
    @Context('res') res: Response) {

    const result = await this.authService.login(args, res);
    return result;
  }

  @Mutation(() => MessageResult)
  async logout(@Context('req') req, @Context('res') res: Response) {
    res.clearCookie('jwt');

    req.user = undefined;

    return {
      message: 'success'
    }
  }
}