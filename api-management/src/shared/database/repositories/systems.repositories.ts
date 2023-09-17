import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class SystemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.SystemCreateArgs) {
    return this.prismaService.system.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.SystemFindUniqueArgs) {
    return this.prismaService.system.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.SystemFindManyArgs) {
    return this.prismaService.system.findMany(findManyDto);
  }

  delete(deleteDto: Prisma.SystemDeleteArgs) {
    return this.prismaService.system.delete(deleteDto);
  }

  update(updateDto: Prisma.SystemUpdateArgs) {
    return this.prismaService.system.update(updateDto);
  }
}
