import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
