import { UserDocument } from '../schema/user.schema';

export interface IUserService {
  findOneByEmail(email: string): Promise<UserDocument>;
  findOneById(id: string): Promise<UserDocument>;
  findByEmailAndGetPassword(email: string): Promise<UserDocument | null>;
}
