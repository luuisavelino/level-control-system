import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesRepository } from 'src/shared/database/repositories/schedules.repositories';

@Injectable()
export class SchedulesService {
  constructor(private readonly scheduleRepo: SchedulesRepository) {}

  findAll() {
    return this.scheduleRepo.findMany({});
  }

  findOne(uuid: string) {
    return this.scheduleRepo.findUnique({
      where: { uuid },
    });
  }

  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepo.create({
      data: createScheduleDto,
    });
  }

  update(uuid: string, updateScheduleDto: UpdateScheduleDto) {
    const { name, startTime, endTime } = updateScheduleDto;

    return this.scheduleRepo.update({
      where: { uuid },
      data: { name, startTime, endTime },
    });
  }

  async remove(uuid: string) {
    await this.scheduleRepo.delete({
      where: { uuid },
    });

    return null;
  }
}
