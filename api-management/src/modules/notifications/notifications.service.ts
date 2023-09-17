import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsRepository } from 'src/shared/database/repositories/notifications.repositories';

@Injectable()
export class NotificationsService {
  constructor(private readonly notificationRepo: NotificationsRepository) {}

  findAll() {
    return this.notificationRepo.findMany({});
  }

  findOne(uuid: string) {
    return this.notificationRepo.findUnique({
      where: { uuid },
    });
  }

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepo.create({
      data: createNotificationDto,
    });
  }

  update(uuid: string, updateNotificationDto: UpdateNotificationDto) {
    const { name, enabled, level, type } = updateNotificationDto;

    return this.notificationRepo.update({
      where: { uuid },
      data: {
        name,
        enabled,
        level,
        type,
      },
    });
  }

  async remove(uuid: string) {
    await this.notificationRepo.delete({
      where: { uuid },
    });

    return null;
  }
}
