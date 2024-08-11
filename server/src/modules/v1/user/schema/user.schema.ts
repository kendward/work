import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  ModelEntity,
  ModelEntitySchema,
} from 'src/modules/common/model/model.entity';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends ModelEntity {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  passwordChangedAt: Date;

  @Prop({ type: String })
  passwordResetToken: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  passwordResetExpires: Date;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.add(ModelEntitySchema);

/**
 * Pre-save hooks
 */
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.pre<UserDocument>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

/**
 * Instance methods
 */
UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return JWTTimestamp < changedTimestamp;
  }
  // False means not changed
  return false;
};

UserSchema.methods.createPasswordResetToken = function (): string {
  try {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  } catch (error) {
    console.log(error);
  }
};
