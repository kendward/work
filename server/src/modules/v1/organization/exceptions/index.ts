import { HttpException, HttpStatus } from '@nestjs/common';

export class OrganizationNotFoundException extends HttpException {
  constructor() {
    super('Organization not found', HttpStatus.NOT_FOUND);
  }
}
