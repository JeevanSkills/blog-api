import { Request, Response } from 'express';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dtos/api-response.dto';
import { plainToInstance } from 'class-transformer';
import { BlogResponseDto } from '../../blogs/dtos/blog-response.dto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: T) => {
        let transformedData: any = data;

        // Heuristic: If the data looks like a Blog object or an array of Blog objects,
        // apply the BlogResponseDto transformation.
        // A more robust solution might involve custom decorators or metadata.
        if (
          data &&
          ((Array.isArray(data) &&
            data.every(
              (item) =>
                item &&
                typeof item === 'object' &&
                'title' in item &&
                'content' in item,
            )) ||
            (!Array.isArray(data) &&
              typeof data === 'object' &&
              'title' in data &&
              'content' in data &&
              'userId' in data))
        ) {
          if (Array.isArray(data)) {
            transformedData = data.map((item) =>
              plainToInstance(BlogResponseDto, item, {
                excludeExtraneousValues: true,
              }),
            );
          } else {
            transformedData = plainToInstance(BlogResponseDto, data, {
              excludeExtraneousValues: true,
            });
          }
        }

        const statusCode: HttpStatus = response.statusCode || HttpStatus.OK;
        const message =
          request.method === 'POST' && statusCode === HttpStatus.CREATED
            ? 'Resource created successfully'
            : 'Operation successful';

        return new ApiResponse(transformedData, statusCode, message);
      }),
    );
  }
}
