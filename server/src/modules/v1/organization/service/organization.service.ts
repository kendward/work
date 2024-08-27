import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationDocument,
} from '../schema/organization.schema';
import { Model } from 'mongoose';
import {
  CreateOrganizationDto,
  DeleteAccountDto,
  UpdateBillingInformationDto,
} from '../dto/organization.dto';
import { IOrganizationService } from '../interface/organization';
import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import { OrganizationNotFoundException } from '../exceptions';
import { Services } from 'src/modules/utils/constants';
import {
  IncorrectPasswordException,
  UserNotFoundException,
} from '../../user/exceptions/user.exceptions';
import { UserService } from '../../user/service/user.service';
import { TokenService } from '../../user/service/token.service';

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    @Inject(Services.USERS) private readonly userService: UserService,
    @Inject(Services.TOKEN) private readonly tokenService: TokenService,
  ) {}

  async createOrganization(
    organization: CreateOrganizationDto,
  ): Promise<OrganizationDocument> {
    const organizationExists = await this.organizationModel.findOne({
      email: organization.email,
    });
    if (organizationExists)
      throw new BadRequestException('Organization already exists');

    return await this.organizationModel.create(organization);
  }

  async saveBillingInformation(
    body: UpdateBillingInformationDto,
  ): Promise<ResponseOut<any>> {
    const organization = await this.organizationModel.findOne({
      _id: body.organization,
    });

    if (!organization) {
      throw new OrganizationNotFoundException();
    }

    organization.billingInformation = body;
    await organization.save();

    return {
      statusCode: 200,
      status: 'success',
      message: 'Billing information updated successfully',
    };
  }

  async deleteAccount(body: DeleteAccountDto): Promise<ResponseOut<any>> {
    const user = await this.userService.findOne({
      _id: body.owner,
      organization: body.organization,
    });
    if (!user) throw new UserNotFoundException();

    if (!(await user.correctPassword(body.password, user.password)))
      throw new IncorrectPasswordException();

    const organization = await this.organizationModel.findOne({
      _id: body.organization,
      owner: body.owner,
    });

    if (!organization) {
      throw new OrganizationNotFoundException();
    }

    await organization.deleteOne();
    await user.deleteOne();
    await this.tokenService.deleteMany({ userId: user._id });
    return {
      statusCode: 200,
      status: 'success',
      message: 'Account deleted successfully',
    };
  }
}
