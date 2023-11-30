import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
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
  @IsOptional()
  @IsEnum(NotificationMethod)
  method: NotificationMethod[];
}
