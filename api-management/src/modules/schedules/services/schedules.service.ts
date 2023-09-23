import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { SchedulesRepository } from 'src/shared/database/repositories/schedules.repositories';
import { ValidateScheduleService } from './validate-schedule.service';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly scheduleRepo: SchedulesRepository,
    private readonly validateScheduleService: ValidateScheduleService,
  ) {}

  findAll() {
    return this.scheduleRepo.findMany({});
  }

  async findOne(scheduleUuid: string) {
    const schedule = await this.scheduleRepo.findUnique({
      where: { uuid: scheduleUuid },
    });

    if (!schedule) {
      throw new NotFoundException();
    }

    return schedule;
  }

  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepo.create({
      data: createScheduleDto,
    });
  }

  async update(scheduleUuid: string, updateScheduleDto: UpdateScheduleDto) {
    await this.validateScheduleService.validate(scheduleUuid);

    const { name, startTime, endTime } = updateScheduleDto;

    return this.scheduleRepo.update({
      where: { uuid: scheduleUuid },
      data: { name, startTime, endTime },
    });
  }

  async remove(scheduleUuid: string) {
    await this.validateScheduleService.validate(scheduleUuid);

    await this.scheduleRepo.delete({
      where: { uuid: scheduleUuid },
    });

    return null;
  }
}
