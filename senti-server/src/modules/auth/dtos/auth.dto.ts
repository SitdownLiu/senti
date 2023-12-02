import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserInfoDto } from './../../base/dtos/user.dto';

export class PasswordLoginDto {
  @ApiProperty({ description: '登录账号' })
  @IsNotEmpty()
  account: string;

  @ApiProperty({ description: '登录密码' })
  @IsNotEmpty()
  password: string;
}

export class AuthUserInfoDto extends UserInfoDto {
  @ApiProperty({ description: '用户id' })
  id: string;

  @ApiProperty({ description: '用户账号' })
  account: string;

  @ApiProperty({ required: false, description: '用户密码' })
  password: string;

  @ApiProperty({ description: '用户角色列表' })
  roles: [];
}

export class QueryScopeDto {
  @ApiProperty({ enum: ['private-app', 'public-app'], description: '作用域' })
  scope: string;
}

export class TokenBodyDto {
  @ApiProperty({ description: '应用id' })
  appId: string;

  @ApiProperty({ description: '应用秘钥' })
  appSecret: string;
}
