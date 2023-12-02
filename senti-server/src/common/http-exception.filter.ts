import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
//@Catch() //如果要捕获任意类型的异常，则此处留空
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //catch(exception:unknown, host:ArgumentsHost){//如果要捕获任意类型的异常，则异常类型应为any或unkown
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //如果要捕获的是任意类型的异常，则可能需要对此做如下判断来区分不同类型的异常
    const exceptionStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const res = exception.getResponse();

    //400
    if (status === HttpStatus.BAD_REQUEST) {
      response['message'] = res['message'];
    }

    //403
    if (status === HttpStatus.UNAUTHORIZED) {
      if (typeof response !== 'string') {
        response['message'] =
          response['message'] ||
          'You do not have permission to access this resource';
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: response['message'] || exception.message,
      path: request.url,
    });
  }
}
