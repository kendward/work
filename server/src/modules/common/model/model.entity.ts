import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type ModelEntityDocument = HydratedDocument<ModelEntity>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class ModelEntity {
  @Transform(({ value }) => value.toString())
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    auto: true,
  })
  _id: ObjectId;

  @Prop({ type: String, default: 'Anonymous' })
  createdBy: string;

  @Prop({ type: mongoose.Schema.Types.Date, default: () => new Date() })
  @Transform((value) => value || new Date(), { toClassOnly: true })
  createdAt: Date;

  @Prop({ type: String, default: null })
  updatedBy: string;

  @Prop({ type: Date, default: null })
  updatedAt: Date;
}

export const ModelEntitySchema = SchemaFactory.createForClass(ModelEntity);

ModelEntitySchema.virtual('id').get(function (this: ModelEntity) {
  return this._id.toString();
});
