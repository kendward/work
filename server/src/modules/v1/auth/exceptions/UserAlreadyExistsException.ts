import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(`User with email ${email} already exists`, HttpStatus.CONFLICT);
  }
}
