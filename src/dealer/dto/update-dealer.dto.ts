import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateDealerDto } from './create-dealer.dto';

export class UpdateDealerDto extends PartialType(CreateDealerDto) {
  @IsOptional()
  name: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  transactions: string;
}
