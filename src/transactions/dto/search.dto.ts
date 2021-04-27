import { IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  nationalId: string;
  @IsOptional()
  purchaseCash: number;
  @IsOptional()
  purchaseDate: Date;
  @IsOptional()
  client: string;
}
