import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigurationsRepository } from 'src/shared/database/repositories/configurations.repositories';

@Injectable()
export class ValidateConfigurationService {
  constructor(private readonly configRepo: ConfigurationsRepository) {}

  async validate(configurationUuid: string) {
    const configuration = await this.configRepo.findUnique({
      where: { uuid: configurationUuid },
    });

    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }
  }
}
