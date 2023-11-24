import { BaseEntity, Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('productlist_image')
export default class ProductListImage extends BaseEntity {
  @Field()
  @Column({ primary: true, name: 'pli_jisa' })
  jisa: string;

  @Field()
  @Column({ primary: true, name: 'pli_smcode' })
  smCode: string;

  @Field()
  @Column({ name: 'pli_image', type: 'longblob' })
  image: Buffer;
}
