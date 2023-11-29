import { IsNotEmpty } from 'class-validator';

export default class CreateLogintokenDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  key: string;
}
