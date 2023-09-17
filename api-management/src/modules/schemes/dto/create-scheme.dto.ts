import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSchemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  setpoint: number;

  @IsNumber()
  @IsNotEmpty()
  minLevel: number;

  @IsNumber()
  @IsNotEmpty()
  maxLevel: number;
}
