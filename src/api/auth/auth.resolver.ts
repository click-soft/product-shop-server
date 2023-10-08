import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResult, LoginDto, User } from "src/graphql";
import { Response, Request } from 'express';
import { GqlAuthGuard } from "./gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { GetGqlUser, GetUser } from "src/decorators/get-user";

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) { }

  @Query()
  @UseGuards(GqlAuthGuard)
  async getUser(@GetGqlUser() user: User) {
    return user;
  }

  @Mutation()
  async login(
    @Args('loginDto') dto: LoginDto,
    @Context('res') res: Response): Promise<AuthResult> {

    const result = await this.authService.login(dto, res);
    return result;
  }

  @Mutation()
  async logout(@Context('req') req, @Context('res') res: Response): Promise<AuthResult> {
    res.clearCookie('jwt');

    req.user = undefined;

    return {
      message: 'success'
    }
  }
}