import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PasswordLoginDto, AuthUserInfoDto, QueryScopeDto, TokenBodyDto } from './dtos/auth.dto';
import { User } from './../../common/common.decorator';

@ApiTags('身份验证和授权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户账号密码登录' })
  @Post('/passwordLogin')
  passwordLogin(@Body() body: PasswordLoginDto) {
    return this.authService.passwordLogin(body);
  }

  @ApiOperation({ summary: '用户获取自己的信息' })
  @ApiHeader({ name: 'senti_token', description: 'accessToken' })
  @ApiResponse({ status: 200, type: AuthUserInfoDto })
  @UseGuards(AuthGuard('jwt'))
  @Get('/getUserInfo')
  getUserInfo(@User() user) {
    return this.authService.getUserInfo(user);
  }

  @ApiOperation({ summary: '应用获取授权' })
  @Post('/bin/token')
  binToken(@Query() query: QueryScopeDto, @Body() body: TokenBodyDto) {
    return this.authService.binToken(query.scope, body);
  }

  @ApiOperation({ summary: '应用授权' })
  @Post('/app')
  appToken(@Body() body: TokenBodyDto) {
    return this.authService.appToken(body);
  }
}
