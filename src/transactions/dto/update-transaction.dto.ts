import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsNotEmpty()
  sellCash: number;
  @IsNotEmpty()
  sellDate: Date;
  @IsNotEmpty()
  dealer: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phoneNumber: string;
}
