import { SignupDto } from '../../auth/dto/signup.dto';
import { Roles } from '../entities/Roles';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
