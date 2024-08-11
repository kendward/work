import { createParamDecorator } from '@nestjs/common';
import { UserDocument } from 'src/modules/v1/user/schema/user.schema';

export const AuthUser = createParamDecorator(
  (data, request): UserDocument => request.user,
);
