import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';
import { jwtConfig } from './../config/jwt.config';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [RolesGuard],
})
export class GuardsModule {}
