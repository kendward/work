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
    const error = exception.getResponse() as {
      message: string;
      errors: string;
    };

    const isProduction =
      this.configService.get<string>('NODE_ENV') === APP_ENV.PRODUCTION;

    const devErrorResponse = {
      statusCode: status,
      // timestamp: new Date().toISOString(),
      message: exception.message,
      // stacktrace: exception.stack,
      ...error,
    };

    const prodErrorResponse = {
      statusCode: status,
      // timestamp: new Date().toISOString(),
      ...error,
    };

    if (!isProduction) {
      this.logger.error(devErrorResponse);
    }

    response
      .status(status)
      .json(isProduction ? prodErrorResponse : devErrorResponse);
  }
}
