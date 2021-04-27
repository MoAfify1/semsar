import { IsNotEmpty } from 'class-validator';

export class FilesDto {
  @IsNotEmpty()
  commericalRecordImage: any;
  @IsNotEmpty()
  insuranceImage: any;
  @IsNotEmpty()
  taxCardImage: any;
  @IsNotEmpty()
  nationaIdImage: any;
}
