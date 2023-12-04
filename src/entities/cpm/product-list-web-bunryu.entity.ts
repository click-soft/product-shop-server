import { BaseEntity, Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('productlist_webbunryu')
export default class ProductListWebBunryu extends BaseEntity {
  @Field()
  @Column({ primary: true, name: 'pw_code' })
  code: string;

  @Field()
  @Column({ name: 'pw_name' })
  name: string;

  @Field()
  @Column({ name: 'pw_fit' })
  fit: boolean;
}
