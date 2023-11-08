import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'accountTemp' })
export class AccountTemp extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  accountId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  loginToken?: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  expiryDate?: Date;
}
