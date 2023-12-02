import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, Length } from 'class-validator';
import { PageDto } from './../../../common/base.tdo';

//用户信息
export class UserInfoDto {
  @ApiProperty({ description: '姓名' })
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @ApiProperty({ description: '身份证号码或用户唯一标识' })
  @IsNotEmpty({ message: '身份证号码或用户唯一标识不能为空' })
  idCard: string;

  @ApiProperty({ required: false, description: '手机号码' })
  phone: string;

  @ApiProperty({ required: false, description: '电子邮箱' })
  email: string;
}

//添加用户
export class AddUserDto extends UserInfoDto {
  @ApiProperty({ description: '登录账号' })
  @IsNotEmpty({ message: '登录账号不能为空' })
  @Length(6, 32, { message: '登录账号是6~8位的英文和数字组合' })
  account: string;

  @ApiProperty({ required: false, description: '登录密码' })
  @IsNotEmpty({ message: '登录密码不能为空' })
  @Length(6, 32, { message: '登录密码是6~8位的英文和数字组合' })
  password: string;
}

//添加机构管理员
export class AddHospitalDto extends AddUserDto {
  @ApiProperty({ description: '机构id' })
  @IsNotEmpty()
  organizationId: string;
}

//修改密码
export class UpdatePasswordDto {
  @ApiProperty({ description: '原密码' })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: '新密码' })
  @IsNotEmpty()
  newPassword: string;
}

//修改和删除用户信息
export class UserParamDto {
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '用户id不能为空' })
  id: string;
}

//查询用户
export class QueryUserDto extends PageDto {
  @ApiProperty({ required: false, description: '用户id' })
  id: string;

  @ApiProperty({ required: false, description: '姓名' })
  name: string;
}

//查询医生
export class QueryDoctorDto extends QueryUserDto {
  @ApiProperty({ required: false, description: '科室id' })
  departmentId: string;

  @ApiProperty({ required: false, default: false, description: '无科室' })
  isNotDep: boolean;
}

//查询医院管理员
export class QueryHospitalDto extends QueryUserDto {
  @ApiProperty({ required: false, description: '机构id' })
  organizationId: string;
}

export class ResUserDto extends UserInfoDto {
  @ApiProperty({ description: '用户id' })
  id: string;

  @ApiProperty({ description: '登录账号' })
  account: string;

  @ApiProperty({ required: false, description: '用户来源' })
  source: string;

  @ApiProperty({ description: '隶属机构信息' })
  organization: {};
}
