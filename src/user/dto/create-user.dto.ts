import { IsNotEmpty, Allow, IsEnum } from 'class-validator';
export enum RoleEnum {
  admin = 'admin',
  normal = 'normal',
}
export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  public role: RoleEnum;
}
