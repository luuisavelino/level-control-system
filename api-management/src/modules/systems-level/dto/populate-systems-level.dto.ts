import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChartInterval } from '../entities/chart-interval.entity';

export class PopulateSystemsLevelDto {
  @IsUUID()
  @IsNotEmpty()
  systemUuid: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ChartInterval)
  interval: string;
}
