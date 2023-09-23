import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulesRepository } from 'src/shared/database/repositories/schedules.repositories';

@Injectable()
export class ValidateScheduleService {
  constructor(private readonly scheduleRepo: SchedulesRepository) {}

  async validate(uuid: string) {
    const schedule = await this.scheduleRepo.findUnique({
      where: { uuid },
    });

    if (!schedule) {
      throw new NotFoundException();
    }

    return schedule;
  }
}
