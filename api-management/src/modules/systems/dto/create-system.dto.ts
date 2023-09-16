import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateSystemDto {
  @IsString()
  @IsNotEmpty()
  @Matches('^(?!.*//)[a-zA-Z0-9-_/]+[a-zA-Z0-9-_]$')
  path: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;

  @IsString()
  @IsNotEmpty()
  controlUuid: string;

  @IsString()
  @IsNotEmpty()
  schemeUuid: string;

  @IsString()
  @IsNotEmpty()
  configurationUuid: string;
}
