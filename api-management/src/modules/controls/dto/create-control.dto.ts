import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateControlDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // TODO:
  // type: string;

  @IsNumber()
  kp: number;

  @IsNumber()
  ki: number;

  @IsNumber()
  kd: number;
}
