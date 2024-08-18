import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Password reset token is invalid!', HttpStatus.UNAUTHORIZED);
  }
}
