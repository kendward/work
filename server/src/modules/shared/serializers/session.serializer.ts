import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from 'src/modules/utils/constants';
import { User } from 'src/modules/v1/user/schema/user.schema';
import { UserService } from 'src/modules/v1/user/service/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly usersService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, { id: user._id });
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.findById(userId);
    done(null, user);
  }
}
