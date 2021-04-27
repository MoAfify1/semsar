import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsOptional()
  client: string;
  @IsOptional()
  dealer: string;
  @IsNotEmpty()
  //قيمة الشراء
  purchaseCash: number;
  @IsNotEmpty()
  // تاريخ الشراء
  purchaseDate: Date;
  @IsOptional()
  // مبلغ البيع
  sellCash: number;
  @IsOptional()
  // تاريخ البيع
  sellDate: Date;
  @IsOptional()
  // الربح
  profit: number;
  @IsOptional()
  //  استخراج الشهاده
  isExtracted: boolean;
  @IsOptional()
  //  تاريخ استلام الشهاده
  relasePaperDate: Date;
  @IsOptional()
  //  استلام العميل للشهاده
  paperSentToClient: boolean;
  @IsOptional()
  //  تاريخ الارسال
  sentPaperDate: Date;
  @IsNotEmpty()
  // الرقم القومي
  nationalId: string;
  @IsOptional()
  // صورة
  paper: string;
  @IsNotEmpty()
  productType: string;
}
