import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationLevel } from '../entities/NotificationLevel';
import { NotificationMethod } from '../entities/NotificationMethod';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @IsString()
  @IsNotEmpty()
  @IsEnum(NotificationLevel)
  level: NotificationLevel;

  @IsString()
  @IsNotEmpty()
  @IsEnum(NotificationMethod)
  method: NotificationMethod;
}
