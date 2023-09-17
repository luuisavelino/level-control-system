import { PartialType } from '@nestjs/mapped-types';
import { SignupDto } from '../../auth/dto/signup.dto';
import { Roles } from '../entities/Roles';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(SignupDto) {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
