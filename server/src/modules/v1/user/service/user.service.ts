import { HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/user.schema';
import { IGetCurrentUser, IUserService } from '../interface/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelRepository } from 'src/modules/shared/model/model.repository';
import {
  ChangePasswordDto,
  ReceiveNotificationStatusDto,
  UpdateProfileDto,
} from '../dto/user.dto';
import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import {
  IncorrectPasswordException,
  UserNotFoundException,
} from '../exceptions/user.exceptions';
import {
  Organization,
  OrganizationDocument,
} from '../../organization/schema/organization.schema';

@Injectable()
export class UserService
  extends ModelRepository<UserDocument>
  implements IUserService
{
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async getCurrentUserInfo(query: IGetCurrentUser): Promise<any> {
    const user = await this.userModel
      .findOne(
        {
          _id: query.id,
          organization: query.organization,
        },
        {
          name: 1,
          email: 1,
          receiveUpdates: 1,
          organization: 1,
          _id: 0,
        },
      )
      .populate({
        path: 'organization',
        model: Organization.name,
        select: 'email billingInformation -_id',
      })
      .lean();
    return {
      ...user,
    };
  }
  async updateProfile(body: UpdateProfileDto): Promise<ResponseOut<any>> {
    await this.userModel.updateOne(
      {
        _id: body.userId,
        organization: body.organization,
      },
      {
        $set: {
          name: body.name,
          email: body.email,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      status: 'success',
      message: 'Profile updated successfully',
    };
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).populate('organization');
  }

  async findByEmailAndGetPassword(email: string): Promise<UserDocument | null> {
    return (await this.userModel
      .findOne({ email })
      .select('+password')) as UserDocument | null;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseOut<any>> {
    const { currentPassword, newPassword } = changePasswordDto;
    const user = await this.findOneById(changePasswordDto.userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!(await user.correctPassword(currentPassword, user.password))) {
      throw new IncorrectPasswordException();
    }

    user.password = newPassword;
    await user.save();
    return {
      statusCode: HttpStatus.OK,
      status: 'success',
      message: 'Password changed successfully',
    };
  }

  async updateReceiveNotificationsStatus(
    body: ReceiveNotificationStatusDto,
  ): Promise<ResponseOut<any>> {
    await this.userModel.updateOne(
      {
        _id: body.user,
        organization: body.organization,
      },
      {
        $set: {
          receiveUpdates: body.status,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      status: 'success',
      message: 'Notification status updated successfully',
    };
  }
}
