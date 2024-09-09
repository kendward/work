import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import {
  ChangePasswordDto,
  ReceiveNotificationStatusDto,
  UpdateProfileDto,
} from '../dto/user.dto';
import { UserDocument } from '../schema/user.schema';
export interface IGetCurrentUser {
  id: string;
  organization: string;
  role: string;
}
export interface IUserService {
  getCurrentUserInfo(query: IGetCurrentUser): Promise<any>;
  findOneByEmail(email: string): Promise<UserDocument>;
  findOneById(id: string): Promise<UserDocument>;
  findByEmailAndGetPassword(email: string): Promise<UserDocument | null>;
  updateProfile(body: UpdateProfileDto): Promise<ResponseOut<any>>;
  changePassword(body: ChangePasswordDto): Promise<ResponseOut<any>>;
  updateReceiveNotificationsStatus(
    body: ReceiveNotificationStatusDto,
  ): Promise<ResponseOut<any>>;
}
