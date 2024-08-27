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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';

import { AuthUser } from 'src/modules/shared/decorators/auth-user.decorator';
import { CurrentUser } from 'src/modules/shared/interfaces/request-with-user';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IOrganizationService } from '../interface/organization';
import {
  DeleteAccountDto,
  UpdateBillingInformationDto,
} from '../dto/organization.dto';
import { RolesGuard } from 'src/modules/shared/guards/role.guard';
import { HasRole } from 'src/modules/shared/decorators/role.decorator';
import { ROLES } from '../constants';

@ApiTags('v1/Organization')
@Controller({
  path: 'Organization',
  version: '1',
})
export class OrganizationController {
  constructor(
    @Inject(Services.ORGANIZATION)
    private readonly organizationService: IOrganizationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update Billing Information',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Update Billing Information',
    type: UpdateBillingInformationDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(ROLES.ADMIN)
  @Post('SaveBillingInformation')
  async saveBillingInformation(
    @AuthUser() { organization: { id } }: CurrentUser,
    @Body() body: UpdateBillingInformationDto,
  ): Promise<ResponseOut<any>> {
    body.organization = id;
    return await this.organizationService.saveBillingInformation(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Delete Account',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Delete Account',
    type: DeleteAccountDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(ROLES.ADMIN)
  @Post('DeleteAccount')
  async deleteAccount(
    @AuthUser() { id, organization }: CurrentUser,
    @Body() body: DeleteAccountDto,
  ): Promise<ResponseOut<any>> {
    body.organization = organization.id;
    body.owner = id;
    return await this.organizationService.deleteAccount(body);
  }
}
