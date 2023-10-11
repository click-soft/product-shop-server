import { Kind, ValueNode } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';

@Scalar('Any', type => Object)
export class AnyScalar implements CustomScalar<any, any> {
  description = 'Any scalar type';

  parseValue(value: any): any {
    return value; // value sent to the client
  }

  serialize(value: any): any {
    return value; // value received by the client
  }

  parseLiteral(ast: ValueNode): any {
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value;
      case Kind.BOOLEAN:
        return Boolean(ast.value);
      case Kind.INT:
        return parseInt(ast.value, 10);
      case Kind.FLOAT:
        return parseFloat(ast.value);
      default:
        return null;
    }
  }
}