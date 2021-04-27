import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: ['admin', 'normal'],
  })
  role: string;
  @Prop({
    type: Number,
    default: 0,
  })
  try: number;
  @Prop({
    type: Boolean,
    default: false,
  })
  lock: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
