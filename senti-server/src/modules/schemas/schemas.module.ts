import { Module } from '@nestjs/common';
import { SchemasController } from './schemas.controller';
import { SchemasService } from './schemas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSchema } from './entities/form-schema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormSchema])],
  controllers: [SchemasController],
  providers: [SchemasService],
})
export class SchemasModule {}
