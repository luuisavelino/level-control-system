import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ConfigurationsRepository } from 'src/shared/database/repositories/configurations.repositories';

@Injectable()
export class ConfigurationsService {
  constructor(private readonly configRepo: ConfigurationsRepository) {}

  findAll() {
    return this.configRepo.findMany({});
  }

  findOne(uuid: string) {
    return this.configRepo.findUnique({
      where: { uuid },
    });
  }

  create(createConfigurationDto: CreateConfigurationDto) {
    return this.configRepo.create({
      data: createConfigurationDto,
    });
  }

  update(uuid: string, updateConfigurationDto: UpdateConfigurationDto) {
    const { name, scheduleUuid, notificationUuid } = updateConfigurationDto;

    return this.configRepo.update({
      where: { uuid },
      data: {
        name,
        scheduleUuid,
        notificationUuid,
      },
    });
  }

  async remove(uuid: string) {
    await this.configRepo.delete({
      where: { uuid },
    });

    return null;
  }
}
