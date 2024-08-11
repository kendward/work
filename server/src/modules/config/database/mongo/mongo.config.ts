import { registerAs } from '@nestjs/config';
export default registerAs('mongo', () => ({
  database: process.env.DATABASE,
}));
