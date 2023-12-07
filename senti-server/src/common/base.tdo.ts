import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class PageDto {
  @ApiProperty({ required: false, description: '页码' })
  pageIndex: number;

  @ApiProperty({ required: false, description: '每页条数' })
  pageSize: number;
}
