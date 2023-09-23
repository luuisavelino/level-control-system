import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { NotificationsRepository } from 'src/shared/database/repositories/notifications.repositories';
import { ValidateNotificationService } from './validate-notification.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepo: NotificationsRepository,
    private readonly validateNotificationService: ValidateNotificationService,
  ) {}

  findAll() {
    return this.notificationRepo.findMany({});
  }

  async findOne(notificationUuid: string) {
    const notification = await this.notificationRepo.findUnique({
      where: { uuid: notificationUuid },
    });

    if (!notification) {
      throw new NotFoundException();
    }

    return notification;
  }

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepo.create({
      data: createNotificationDto,
    });
  }

  async update(
    notificationUuid: string,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    await this.validateNotificationService.validate(notificationUuid);

    const { name, enabled, level, type } = updateNotificationDto;

    return this.notificationRepo.update({
      where: { uuid: notificationUuid },
      data: {
        name,
        enabled,
        level,
        type,
      },
    });
  }

  async remove(notificationUuid: string) {
    await this.validateNotificationService.validate(notificationUuid);

    await this.notificationRepo.delete({
      where: { uuid: notificationUuid },
    });

    return null;
  }
}
