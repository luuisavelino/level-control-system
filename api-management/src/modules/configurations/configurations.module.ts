import { Module } from '@nestjs/common';
import { ConfigurationsService } from './services/configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { ValidateConfigurationService } from './services/validate-configuration.service';
import { ValidateScheduleService } from '../schedules/services/validate-schedule.service';
import { ValidateNotificationService } from '../notifications/services/validate-notification.service';

@Module({
  controllers: [ConfigurationsController],
  providers: [
    ConfigurationsService,
    ValidateScheduleService,
    ValidateNotificationService,
    ValidateConfigurationService,
  ],
  exports: [ValidateConfigurationService],
})
export class ConfigurationsModule {}
