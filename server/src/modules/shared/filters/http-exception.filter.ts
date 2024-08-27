import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { APP_ENV } from 'src/modules/utils/constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | object;

    if (typeof exceptionResponse === 'string') {
      message = { message: exceptionResponse };
    } else if (Array.isArray(exceptionResponse)) {
      message = { message: exceptionResponse.join(', ') };
    } else if (typeof exceptionResponse === 'object') {
      message = exceptionResponse;
    } else {
      message = { message: exception.message };
    }

    const isProduction =
      this.configService.get<string>('NODE_ENV') === APP_ENV.PRODUCTION;

    const devErrorResponse = {
      statusCode: status,
      message: exception.message,
      ...message,
    };

    const prodErrorResponse = {
      statusCode: status,
      ...message,
    };

    if (!isProduction) {
      this.logger.error(devErrorResponse);
    }

    response
      .status(status)
      .json(isProduction ? prodErrorResponse : devErrorResponse);
  }
}
