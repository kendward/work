import { Controller, Inject } from '@nestjs/common';
import { Services } from 'src/modules/utils/constants';
import { IUserService } from '../interface/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
}
