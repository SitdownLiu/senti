import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { RequestInterceptor } from './interceptor/request.interceptor';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //限制请求实体的大小
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  //cors跨域
  app.enableCors();
  //静态资源目录
  app.useStaticAssets(join(__dirname, '..', process.env.STATIC || 'public'));
  //API文档
  await swaggerConfig(app);
  //自动验证
  app.useGlobalPipes(new ValidationPipe());
  //请求日志
  app.useGlobalInterceptors(new RequestInterceptor());
  //返参
  app.useGlobalInterceptors(new ResponseInterceptor());

  //启动端口
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
