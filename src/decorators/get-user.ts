import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!req.user) {
    throw new UnauthorizedException();
  }
  return req.user;
});

export const GetGqlUser = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;

  if (!req.user) {
    throw new UnauthorizedException();
  }
  return req.user;
});

