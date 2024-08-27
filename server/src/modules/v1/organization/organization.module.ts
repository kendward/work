import { Module } from '@nestjs/common';
import { OrganizationService } from './service/organization.service';
import { OrganizationController } from './controller/organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './schema/organization.schema';
import { Services } from 'src/modules/utils/constants';
import { UserService } from '../user/service/user.service';
import { TokenService } from '../user/service/token.service';
import { User, UserSchema } from '../user/schema/user.schema';
import { Token, TokenSchema } from '../user/schema/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [
    {
      provide: Services.ORGANIZATION,
      useClass: OrganizationService,
    },
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.TOKEN,
      useClass: TokenService,
    },
  ],
  exports: [
    {
      provide: Services.ORGANIZATION,
      useClass: OrganizationService,
    },
  ],
})
export class OrganizationModule {}
