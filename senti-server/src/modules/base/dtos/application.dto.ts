import { ApiProperty } from '@nestjs/swagger';

export class AddApplicationDto {
  @ApiProperty({ required: false, description: '应用id' })
  id: string;

  @ApiProperty({ enum: ['app', 'admin'], description: '应用类型' })
  type: string;

  @ApiProperty({ description: '应用名称' })
  name: string;

  @ApiProperty({ required: false, description: '应用说明' })
  remark: string;
}
