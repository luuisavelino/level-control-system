import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class ConfigurationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ConfigurationCreateArgs) {
    return this.prismaService.configuration.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.ConfigurationFindUniqueArgs) {
    return this.prismaService.configuration.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.ConfigurationFindManyArgs) {
    return this.prismaService.configuration.findMany(findManyDto);
  }

  delete(deleteDto: Prisma.ConfigurationDeleteArgs) {
    return this.prismaService.configuration.delete(deleteDto);
  }

  update(updateDto: Prisma.ConfigurationUpdateArgs) {
    return this.prismaService.configuration.update(updateDto);
  }
}
