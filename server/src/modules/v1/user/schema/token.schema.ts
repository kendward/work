import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type TokenDocument = Token & Document;
@Schema({
  timestamps: true,
})
export class Token extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: String, required: true })
  refreshToken: string;

  @Prop({ type: Date, required: true })
  refreshTokenExpires: Date;
}

const TokenSchema = SchemaFactory.createForClass(Token);
export { TokenSchema };
