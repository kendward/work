import { SetMetadata } from '@nestjs/common';
import { HAS_ROLES_KEY } from '../constants';

export const HasRole = (...roles: string[]) =>
  SetMetadata(HAS_ROLES_KEY, roles);
