import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigurationDto } from '../dto/create-configuration.dto';
import { UpdateConfigurationDto } from '../dto/update-configuration.dto';
import { ConfigurationsRepository } from 'src/shared/database/repositories/configurations.repositories';
import { ValidateConfigurationService } from './validate-configuration.service';
import { ValidateNotificationService } from 'src/modules/notifications/services/validate-notification.service';
import { ValidateScheduleService } from 'src/modules/schedules/services/validate-schedule.service';

@Injectable()
export class ConfigurationsService {
  constructor(
    private readonly configRepo: ConfigurationsRepository,
    private readonly validateConfigurationService: ValidateConfigurationService,
    private readonly validateNotification: ValidateNotificationService,
    private readonly validateSchedule: ValidateScheduleService,
  ) {}

  findAll() {
    return this.configRepo.findMany({});
  }

  async findOne(configurationUuid: string) {
    const configuration = await this.configRepo.findUnique({
      where: { uuid: configurationUuid },
    });

    if (!configuration) {
      throw new NotFoundException();
    }

    return configuration;
  }

  async create(createConfigurationDto: CreateConfigurationDto) {
    const { notificationUuid, scheduleUuid } = createConfigurationDto;

    await this.validateEntities({
      notificationUuid,
      scheduleUuid,
    });

    return this.configRepo.create({
      data: createConfigurationDto,
    });
  }

  async update(
    configurationUuid: string,
    updateConfigurationDto: UpdateConfigurationDto,
  ) {
    const { name, notificationUuid, scheduleUuid } = updateConfigurationDto;

    await this.validateEntities({
      configurationUuid,
      notificationUuid,
      scheduleUuid,
    });

    return this.configRepo.update({
      where: { uuid: configurationUuid },
      data: {
        name,
        scheduleUuid,
        notificationUuid,
      },
    });
  }

  async remove(configurationUuid: string) {
    await this.validateEntities({ configurationUuid });

    await this.configRepo.delete({
      where: { uuid: configurationUuid },
    });

    return null;
  }

  private async validateEntities({
    configurationUuid,
    notificationUuid,
    scheduleUuid,
  }: {
    configurationUuid?: string;
    notificationUuid?: string;
    scheduleUuid?: string;
  }) {
    await Promise.all([
      configurationUuid &&
        this.validateConfigurationService.validate(configurationUuid),
      notificationUuid && this.validateNotification.validate(notificationUuid),
      scheduleUuid && this.validateSchedule.validate(scheduleUuid),
    ]);
  }
}
