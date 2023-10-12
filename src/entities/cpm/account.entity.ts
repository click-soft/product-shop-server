import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: "user_id", type: 'varchar', length: 30, nullable: false })
  userId: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 8, nullable: true })
  ykiho?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 9, nullable: true })
  saupkiho?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  token?: string | null;

  @Field({ nullable: true })
  @Column({ name: "expiry_date", type: 'datetime', nullable: true })
  expiryDate?: Date | null;

  @Field({ nullable: true })
  @Column({ name: "created_at", type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ name: "updated_at", type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}