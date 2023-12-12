import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
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

  @IsArray()
  @IsOptional()
  @IsEnum(NotificationMethod, { each: true })
  method: NotificationMethod[];
}
