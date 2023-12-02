import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddOrUpdateRoleDto {
  @ApiProperty({ required: false, description: '角色id' })
  id: string;

  @ApiProperty({ description: '角色label' })
  name: string;

  @ApiProperty({ description: '角色code' })
  code: string;
}

export class DeleteRoleDto {
  @ApiProperty({ description: '角色id' })
  @IsNotEmpty()
  id: string;
}

export class ResRoleDto extends AddOrUpdateRoleDto {}
