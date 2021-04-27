import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDoc = Document & Client;
@Schema()
export class Client {
  @Prop()
  name: string;
  @Prop()
  nationalId: string;
  @Prop()
  nationaIdImage: string;
  @Prop()
  quotaValue: string;
  @Prop()
  taxCardNumber: string;
  @Prop()
  taxCardImage: string;
  @Prop()
  insuranceNumber: string;
  @Prop()
  insuranceImage: string;
  @Prop()
  address: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  commericalRecord: string;
  @Prop()
  commericalRecordImage: string;
  @Prop()
  addressOfCommericalRecord:string


}
export const CleintSchema = SchemaFactory.createForClass(Client);
