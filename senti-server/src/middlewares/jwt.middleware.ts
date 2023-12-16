import { isEmpty } from 'class-validator';
import { jwtConfig } from './../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware, NotAcceptableException, UnauthorizedException } from '@nestjs/common';

interface Req extends Request {
  user: {};
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private jwtService = new JwtService({ secret: jwtConfig.secret });

  async use(req: Req, res: Response, next: NextFunction) {
    const token = req.headers['senti_token'];
    if (isEmpty(token)) throw new UnauthorizedException();

    try {
      let user = await this.jwtService.verifyAsync(String(token));
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
