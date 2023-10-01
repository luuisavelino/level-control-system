import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/database/services/prisma.service';

@Injectable()
export class ControlsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ControlCreateArgs) {
    return this.prismaService.control.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.ControlFindUniqueArgs) {
    return this.prismaService.control.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.ControlFindManyArgs) {
    return this.prismaService.control.findMany(findManyDto);
  }

  delete(deleteDto: Prisma.ControlDeleteArgs) {
    return this.prismaService.control.delete(deleteDto);
  }

  update(updateDto: Prisma.ControlUpdateArgs) {
    return this.prismaService.control.update(updateDto);
  }
}
