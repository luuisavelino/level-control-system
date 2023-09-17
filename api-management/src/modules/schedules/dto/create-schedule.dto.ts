import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
