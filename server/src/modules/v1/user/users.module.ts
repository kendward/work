import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Services } from 'src/modules/utils/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Token, TokenSchema } from './schema/token.schema';
import { TokenService } from './service/token.service';
import {
  Organization,
  OrganizationSchema,
} from '../organization/schema/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Token.name,
        schema: TokenSchema,
      },
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
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
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.TOKEN,
      useClass: TokenService,
    },
  ],
})
export class UsersModule {}
