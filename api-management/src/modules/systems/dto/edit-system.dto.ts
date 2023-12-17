import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ControlType } from 'src/modules/controls/entities/ControlType';

export class EditSystemDto {
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @IsNumber()
  @IsNotEmpty()
  setpoint: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ControlType)
  type: ControlType;

  @IsNumber()
  kp: number;

  @IsNumber()
  ki: number;

  @IsNumber()
  kd: number;

  @IsBoolean()
  @IsNotEmpty()
  editGroupControl: boolean;

  @IsBoolean()
  @IsNotEmpty()
  editGroupScheme: boolean;
}
