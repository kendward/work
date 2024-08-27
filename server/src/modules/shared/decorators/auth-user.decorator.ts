import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces/request-with-user';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = <RequestWithUser>(
      ctx.switchToHttp().getRequest<RequestWithUser>()
    );
    return request.user;
  },
);
