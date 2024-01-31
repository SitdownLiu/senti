import { Module } from '@nestjs/common';
import { SchemasController } from './schemas.controller';
import { SchemasService } from './schemas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSchema } from './entities/form-schema.entity';
import { ListSchema } from './entities/list-schema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormSchema, ListSchema])],
  controllers: [SchemasController],
  providers: [SchemasService],
})
export class SchemasModule {}
