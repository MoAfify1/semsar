import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  nationalId: string;
  @IsNotEmpty()
  quotaValue: string;
  @IsNotEmpty()
  taxCardNumber: string;
  taxCardImage: string;
  @IsNotEmpty()
  insuranceNumber: string;
  insuranceImage: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phoneNumber: string;
  nationaIdImage: string;
  @IsNotEmpty()
  commericalRecord: string;
  commericalRecordImage: string;
  @IsNotEmpty()
 addressOfCommericalRecord:string
}
