import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'Em' })
export class Em extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryColumn({ name: 'em_code' })
  code: string;

  @Field({ nullable: true })
  @Column({ name: "em_name" })
  name: string
}

