import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import mongoose from 'mongoose';

@Schema({ collection: 'bookmark' })
export class Bookmark extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: Auth;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
