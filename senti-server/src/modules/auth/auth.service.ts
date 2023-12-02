import { isEmpty } from 'class-validator';
import { PrivateApp } from './../base/entities/private-app.entity';
import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MD5 } from 'crypto-js';
import { Repository } from 'typeorm';
import { Role } from '../base/entities/role.entity';
import { User } from '../base/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,

    @InjectRepository(Role)
    private readonly role: Repository<Role>,

    @InjectRepository(PrivateApp)
    private readonly privateApp: Repository<PrivateApp>,

    private readonly jwtService: JwtService,
  ) {}

  //查询用户和角色
  private async findUser(account): Promise<any> {
    return await this.user.findOne({
      where: { account },
      relations: ['roles'],
    });
  }

  //验证用户
  private async validateUser(password, user): Promise<any> {
    if (!user) throw new ForbiddenException(`未注册的用户`);
    if (!password || MD5(password).toString() !== user.password)
      throw new ForbiddenException(`登录密码错误`);

    const { id, name, roles, organization, department } = user;
    console.log('用户登录: ', {
      userId: id,
      userName: name,
      roles: roles ? roles.map(({ code }) => code) : [],
    });

    return true;
  }

  /**
   * 用户账号密码登录
   * @param account 登录账号
   * @param password 登录密码
   */
  async passwordLogin(dto): Promise<any> {
    const { account, password } = dto;

    try {
      let user = await this.findUser(account);
      let validate = await this.validateUser(password, user);

      if (validate) {
        const { id, roles } = user;
        const accessToken = await this.jwtService.sign({
          userId: id,
          roles: await roles.map((role) => role.code),
        });

        return { accessToken, user };
      }
    } catch (error) {
      throw error;
    }
  }

  //用户获取自己的用户信息
  async getUserInfo(user): Promise<any> {
    return this.user.findOne({
      where: { id: user.userId },
      relations: ['roles'],
    });
  }

  //应用获取授权
  async binToken(scope, dto): Promise<any> {
    const appScope = {
      'private-app': this.privateApp,
    };
    const appEntity = appScope[scope];

    if (isEmpty(appEntity)) throw new ForbiddenException('无效的作用域(scope)');

    try {
      const { appId, appSecret } = dto;

      let app = await appEntity.findOne({
        where: { id: appId, secretKey: appSecret },
      });

      if (isEmpty(app))
        throw new NotFoundException('获取授权失败, 应用id或应用秘钥有误.');

      const { name } = app;

      console.log('应用授权: ', {
        appId,
        appSecret,
        appName: name,
        roles: [scope],
      });

      const accessToken = await this.jwtService.sign({
        appId,
        appSecret,
        appName: name,
        roles: [scope],
      });

      return { accessToken };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
