import { NestFactory, Reflector } from '@nestjs/core';
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
import * as session from 'express-session';
import * as passport from 'passport';
import * as compression from 'compression';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './modules/shared/filters/http-exception.filter';
import {
  NestjsWinstonLoggerService,
  appendRequestIdToLogger,
  morganRequestLogger,
  appendIdToRequest,
} from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { setupSwagger } from './modules/shared/swagger';
import { APP_ENV } from './modules/utils/constants';
import { ExpressSessionConfigService } from './modules/config/session/session.service';

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

  // Express session
  const sessionConfig: ExpressSessionConfigService = app.get(
    ExpressSessionConfigService,
  );
  app.use(
    session({
      secret: sessionConfig.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    }),
  );
  app.use(passport.initialize());

  // Logger
  // Define the format for console logs with color
  const consoleFormat = format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`;
    }),
  );

  // Define the format for file logs without color
  const fileFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  );

  const loggerConfig = {
    level: 'info',
    transports: [
      new transports.File({
        filename: 'error.log',
        level: 'error',
        format: fileFormat,
      }),
      new transports.File({
        filename: 'combined.log',
        format: fileFormat,
      }),
      new transports.Console({
        format: consoleFormat,
      }),
    ],
  };

  // Create global logger
  const globalLogger = new NestjsWinstonLoggerService({
    ...loggerConfig,
  });

  // Use the global logger in your app
  app.useLogger(globalLogger);

  // append id to identify request
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));
  app.use(morganRequestLogger(globalLogger));
  // app.use(morganResponseLogger(globalLogger));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(configService));

  // Swagger
  if (configService.get('NODE_ENV') === APP_ENV.DEVELOPMENT) {
    setupSwagger(app);
  }

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
  await app.listen(Number(configService.get('PORT')));

  return app;
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
