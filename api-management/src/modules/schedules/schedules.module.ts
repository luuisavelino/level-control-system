import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { ValidateScheduleService } from './services/validate-schedule.service';
import { SchedulesService } from './services/schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, ValidateScheduleService],
  exports: [ValidateScheduleService],
})
export class SchedulesModule {}
