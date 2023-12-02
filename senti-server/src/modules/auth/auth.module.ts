import { PrivateApp } from './../base/entities/private-app.entity';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from './../../common/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../base/entities/user.entity';
import { Role } from '../base/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './../../config/jwt.config';
import { JwtStrategy } from './../../strategys/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, PrivateApp]),
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
