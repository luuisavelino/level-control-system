import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ControlType } from '../entities/ControlType';

export class CreateControlDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

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
}
