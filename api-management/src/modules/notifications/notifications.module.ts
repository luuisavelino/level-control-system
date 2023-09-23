import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './notifications.controller';
import { ValidateNotificationService } from './services/validate-notification.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, ValidateNotificationService],
  exports: [ValidateNotificationService],
})
export class NotificationsModule {}
