import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/modules/v1/organization/constants';
import { HAS_ROLES_KEY } from '../constants';
import { RequestWithUser } from '../interfaces/request-with-user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<ROLES[]>(
      HAS_ROLES_KEY,
      context.getHandler(),
    );
    if (!roles || roles.length == 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as RequestWithUser;
    return user.role && roles.includes(user.role as ROLES);
  }
}
