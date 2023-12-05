import { RolesGuard } from './guards/roles.guard';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/db.config';
import { BaseModule } from './modules/base/base.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchemasModule } from './modules/schemas/schemas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('db'),
      inject: [ConfigService],
    }),
    AuthModule,
    BaseModule,
    SchemasModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: RolesGuard },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('base');
  }
}
