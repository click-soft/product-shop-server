import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    // Your password validation logic here
    if (password.length < 8) {
      throw new HttpException(
        '비밀번호는 최소 8자 이상이어야 합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const englishRegexp = /[a-zA-Z]/;
    const specialRegexp = /[!@#$%^&*]/;
    const numberRegexp = /\d/;
    const regexpes = [englishRegexp, specialRegexp, numberRegexp];
    const count = regexpes.reduce((acc, regexp) => {
      return acc + (regexp.test(password) ? 1 : 0);
    }, 0);

    if (count < 3) {
      throw new HttpException(
        '비밀번호는 대문자, 소문자, 숫자, 특수 문자\n 중 3가지 이상을 포함해야 합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
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
