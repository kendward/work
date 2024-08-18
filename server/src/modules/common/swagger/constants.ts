import { APP_ENV } from 'src/modules/utils/constants';

export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = 'KLAYD v1 API';
export const SWAGGER_API_DESCRIPTION = 'API Documentation for KLAYD v1';
export const SWAGGER_API_CURRENT_VERSION = '1.0';
export const SERVER_URL =
  process.env.NODE_ENV === APP_ENV.DEVELOPMENT
    ? `${process.env.APP_URL}:${process.env.APP_PORT}`
    : process.env.APP_URL;
