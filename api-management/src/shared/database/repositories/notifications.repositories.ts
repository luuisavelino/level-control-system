import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.NotificationCreateArgs) {
    return this.prismaService.notification.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.NotificationFindUniqueArgs) {
    return this.prismaService.notification.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.NotificationFindManyArgs) {
    return this.prismaService.notification.findMany(findManyDto);
  }

  delete(deleteDto: Prisma.NotificationDeleteArgs) {
    return this.prismaService.notification.delete(deleteDto);
  }

  update(updateDto: Prisma.NotificationUpdateArgs) {
    return this.prismaService.notification.update(updateDto);
  }
}
