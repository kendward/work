import { Request } from 'express';
import { OrganizationDocument } from 'src/modules/v1/organization/schema/organization.schema';
import { User } from 'src/modules/v1/user/schema/user.schema';

export interface CurrentUser extends User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: OrganizationDocument;
}

export interface RequestWithUser extends Request {
  user: CurrentUser;
}
