import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Services } from 'src/modules/utils/constants';
import { IUserService } from '../interface/user';
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
} from '../dto/user.dto';
import { AuthUser } from 'src/modules/shared/decorators/auth-user.decorator';
import { CurrentUser } from 'src/modules/shared/interfaces/request-with-user';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('v1/users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

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
  @Post('change-password')
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
  @Post('receive-notifications')
  async updateReceiveNotificationsStatus(
    @AuthUser() { id, organization }: CurrentUser,
    @Body() body: ReceiveNotificationStatusDto,
  ): Promise<ResponseOut<any>> {
    body.user = id;
    body.organization = organization.id;
    return await this.userService.updateReceiveNotificationsStatus(body);
  }
}
