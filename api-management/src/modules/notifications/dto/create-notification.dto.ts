import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationLevel } from '../entities/NotificationLevel';

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
  @IsEnum(NotificationLevel)
  level: NotificationLevel;

  @IsString()
  @IsNotEmpty()
  type: string;
}
