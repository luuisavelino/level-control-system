import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/database/services/prisma.service';

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ScheduleCreateArgs) {
    return this.prismaService.schedule.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.ScheduleFindUniqueArgs) {
    return this.prismaService.schedule.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.ScheduleFindManyArgs) {
    return this.prismaService.schedule.findMany(findManyDto);
  }

  delete(deleteDto: Prisma.ScheduleDeleteArgs) {
    return this.prismaService.schedule.delete(deleteDto);
  }

  update(updateDto: Prisma.ScheduleUpdateArgs) {
    return this.prismaService.schedule.update(updateDto);
  }
}
