import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class Auth extends Document {
  @Prop()
  name: string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop()
  fistName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
