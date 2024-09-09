import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Services } from 'src/modules/utils/constants';
import { IGetCurrentUser, IUserService } from '../interface/user';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import {
  ChangePasswordDto,
  ReceiveNotificationStatusDto,
  UpdateProfileDto,
} from '../dto/user.dto';
import { AuthUser } from 'src/modules/shared/decorators/auth-user.decorator';
import { CurrentUser } from 'src/modules/shared/interfaces/request-with-user';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { MongooseSerializerInterceptor } from 'src/modules/shared/interceptors/mongoose-interceptor';

@ApiTags('v1/User')
@Controller({
  path: 'User',
  version: '1',
})
@UseInterceptors(MongooseSerializerInterceptor)
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Current User',
    type: ResponseOut<any>,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('GetCurrentUserInfo')
  async getCurrentUserInfo(
    @AuthUser() { id, organization, role }: CurrentUser,
  ): Promise<ResponseOut<any>> {
    return await this.userService.getCurrentUserInfo({
      id,
      organization: organization.id,
      role,
    } as IGetCurrentUser);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Profile updated successfully',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Update profile',
    type: UpdateProfileDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('UpdateProfile')
  async updateProfile(
    @AuthUser() { id, organization }: CurrentUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ResponseOut<any>> {
    updateProfileDto.userId = id;
    updateProfileDto.organization = organization.id;
    return await this.userService.updateProfile(updateProfileDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Password changed successfully',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Change password',
    type: ChangePasswordDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('ChangePassword')
  async changePassword(
    @AuthUser() { id }: CurrentUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseOut<any>> {
    changePasswordDto.userId = id;
    return await this.userService.changePassword(changePasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Receive notifications status updated',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Receive notifications status',
    type: ReceiveNotificationStatusDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('ReceiveNotificationsStatus')
  async updateReceiveNotificationsStatus(
    @AuthUser() { id, organization }: CurrentUser,
    @Body() body: ReceiveNotificationStatusDto,
  ): Promise<ResponseOut<any>> {
    body.user = id;
    body.organization = organization.id;
    return await this.userService.updateReceiveNotificationsStatus(body);
  }
}
