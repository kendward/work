import { HttpException, HttpStatus } from '@nestjs/common';

// Account not verified exception
export class AccountNotVerified extends HttpException {
  constructor() {
    super('Account not verified', HttpStatus.UNAUTHORIZED);
  }
}
