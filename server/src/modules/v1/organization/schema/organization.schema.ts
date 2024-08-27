import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  ModelEntity,
  ModelEntitySchema,
} from 'src/modules/shared/model/model.entity';
import { User } from '../../user/schema/user.schema';
import { ROLES } from '../constants';

export type OrganizationDocument = HydratedDocument<Organization>;
@Schema({
  timestamps: true,
})
class Role extends ModelEntity {
  @Prop({
    type: String,
    enum: ROLES,
  })
  name: string;
}

@Schema({
  timestamps: true,
})
export class BillingInformation {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  zipCode: string;

  @Prop({ type: String })
  vatNumber?: string;

  @Prop({ type: String })
  vatCountry?: string;
}

@Schema({
  timestamps: true,
})
export class Organization extends ModelEntity {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  logo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: BillingInformation })
  billingInformation: BillingInformation;

  @Prop({ type: [Role] })
  roles: Role[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.add(ModelEntitySchema);
