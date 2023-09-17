import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  scheduleUuid: string;

  @IsString()
  @IsUUID()
  notificationUuid: string;
}
