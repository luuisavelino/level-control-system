import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationsRepository } from 'src/shared/database/repositories/notifications.repositories';

@Injectable()
export class ValidateNotificationService {
  constructor(private readonly notificationRepo: NotificationsRepository) {}

  async validate(notificationUuid: string) {
    const notification = await this.notificationRepo.findUnique({
      where: { uuid: notificationUuid },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
  }
}
