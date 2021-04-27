import { IsNotEmpty } from 'class-validator';

export class CreateDealerDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phoneNumber: string;
  /* @IsNotEmpty()
    transactions:string */
}
