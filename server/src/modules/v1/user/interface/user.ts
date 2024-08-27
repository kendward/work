import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import {
  ChangePasswordDto,
  ReceiveNotificationStatusDto,
} from '../dto/user.dto';
import { UserDocument } from '../schema/user.schema';

export interface IUserService {
  findOneByEmail(email: string): Promise<UserDocument>;
  findOneById(id: string): Promise<UserDocument>;
  findByEmailAndGetPassword(email: string): Promise<UserDocument | null>;
  changePassword(body: ChangePasswordDto): Promise<ResponseOut<any>>;
  updateReceiveNotificationsStatus(
    body: ReceiveNotificationStatusDto,
  ): Promise<ResponseOut<any>>;
}
