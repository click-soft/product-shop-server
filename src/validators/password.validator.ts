import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { validPassword } from 'kbr-validator';

@ValidatorConstraint({ async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    const { validate, errorMessage } = validPassword(password);

    if (errorMessage) {
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return validate;
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordValidator,
    });
  };
}
