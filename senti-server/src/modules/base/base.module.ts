import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from './base.service';
import { DictionaryType } from './entities/dictionary-type.entity';
import { Dictionary } from './entities/dictionary.entity';
import { PrivateApp } from './entities/private-app.entity';
import { Role } from './entities/role.entity';
import { BaseController } from './base.controller';
import { Application } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateApp, Role, Dictionary, DictionaryType, Application])],
  providers: [BaseService],
  controllers: [BaseController],
})
export class BaseModule {}
