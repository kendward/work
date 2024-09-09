import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MongooseSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformResponse(data)));
  }

  // Recursive function to transform all ObjectId and Buffer instances
  private transformResponse(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.transformResponse(item));
    } else if (data !== null && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof Buffer) {
          // Handle Buffers if necessary
          data[key] = data[key].toString('hex'); // or another format
        }
        if (
          data[key] &&
          typeof data[key].toString === 'function' &&
          data[key].toString().match(/^[a-fA-F0-9]{24}$/)
        ) {
          // Convert ObjectId to string
          data[key] = data[key].toString();
        } else if (typeof data[key] === 'object') {
          data[key] = this.transformResponse(data[key]); // Recursively handle nested objects
        }
      });
    }
    return data;
  }
}
