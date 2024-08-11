import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/user.schema';
import { IUserService } from '../interface/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelRepository } from 'src/modules/common/model/model.repository';

@Injectable()
export class UserService
  extends ModelRepository<UserDocument>
  implements IUserService
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async findByEmailAndGetPassword(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).select('+password');
  }
}
