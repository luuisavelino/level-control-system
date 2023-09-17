import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
