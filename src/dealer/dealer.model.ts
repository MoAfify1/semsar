import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type DealerDoc = Dealer & Document;

@Schema()
export class Dealer {
  @Prop()
  name: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  transactions: [];
}
export const DealerSchema = SchemaFactory.createForClass(Dealer);
