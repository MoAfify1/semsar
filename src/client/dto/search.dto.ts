import { IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  name: string;
  @IsOptional()
  nationalId: string;
  @IsOptional()
  taxCardNumber: string;
  @IsOptional()
  insuranceNumber: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  commericalRecord: string;
}
