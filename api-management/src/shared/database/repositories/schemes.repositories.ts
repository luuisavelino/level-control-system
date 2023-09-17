import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class SchemesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.SchemeCreateArgs) {
    return this.prismaService.scheme.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.SchemeFindUniqueArgs) {
    return this.prismaService.scheme.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.SchemeFindManyArgs) {
    return this.prismaService.scheme.findMany(findManyDto);
  }

  delete(deleteDto: Prisma.SchemeDeleteArgs) {
    return this.prismaService.scheme.delete(deleteDto);
  }

  update(updateDto: Prisma.SchemeUpdateArgs) {
    return this.prismaService.scheme.update(updateDto);
  }
}
