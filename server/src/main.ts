import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { useContainer, ValidationError } from 'class-validator';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import {
  NestjsWinstonLoggerService,
  appendRequestIdToLogger,
  morganRequestLogger,
  morganResponseLogger,
  appendIdToRequest,
} from 'nestjs-winston-logger';
import { format, transports } from 'winston';

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const reflector = app.get(Reflector);

  // GLOBAL MIDDLEWARES
  app.enableCors({
    credentials: true,
    origin: [configService.get('ORIGIN')],
    optionsSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());

  // Logger

  const loggerCombined = [format.timestamp({ format: 'isoDateTime' })];
  if (configService.get('NODE_ENV') === 'production') {
    loggerCombined.push(format.simple());
  } else {
    loggerCombined.push(format.json(), format.colorize({ all: true }));
  }
  const globalLogger = new NestjsWinstonLoggerService({
    format: format.combine(...loggerCombined),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
      new transports.Console(),
    ],
  });
  app.useLogger(globalLogger);
  // append id to identify request
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));
  app.use(morganRequestLogger(globalLogger));
  // app.use(morganResponseLogger(globalLogger));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(configService));

  app.setGlobalPrefix(configService.get('API_PREFIX') || '/api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const result = {};
        errors.forEach((error) => {
          const constraints = Object.values(error.constraints);
          result[error.property] = constraints[0];
        });

        throw new HttpException(
          {
            statusCode: 400,
            message: 'Input data validation failed',
            errors: result,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(Number(configService.get('APP_PORT')));

  return app;
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
