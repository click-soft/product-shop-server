import { ObjectType } from "@nestjs/graphql"

@ObjectType()
export default class VerifyAccountArgs {
  userId: string
  password: string
}