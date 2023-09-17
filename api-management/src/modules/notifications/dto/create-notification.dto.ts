import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  // TODO:
  // level: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
