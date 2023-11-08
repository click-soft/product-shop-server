import { IsNotEmpty } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  token: string;
}
