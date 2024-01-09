import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // 请求开始时间
    const host = context.switchToHttp();
    const request = host.getRequest<Request>(); //  这里可以得到请求的绝大部分信息
    const reqHeaders: any = request.headers; //得到请求头信息
    // const origin= reqHeaders.host
    // const reqHeaders = request.rawHeaders
    const urlInfo = `${request.method} ${request.url}`;
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `请求接口: ${urlInfo}, 响应时间: ${Date.now() - start} ms  请求来源: ${reqHeaders.host}  Token: ${
              reqHeaders['sentitoken']
            }`,
          ),
        ),
      );
  }
}
