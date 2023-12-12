import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
import { SystemsRepository } from 'src/shared/database/repositories/systems.repositories';
import { ValidateSystemService } from './validate-systems.service';
import { ValidateSchemeService } from 'src/modules/schemes/services/validate-scheme.service';
import { ValidateConfigurationService } from 'src/modules/configurations/services/validate-configuration.service';
import { ValidateControlService } from 'src/modules/controls/services/validate-control.service';

@Injectable()
export class SystemsService {
  constructor(
    private readonly systemRepo: SystemsRepository,
    private readonly validateSchemeService: ValidateSchemeService,
    private readonly validateSystemService: ValidateSystemService,
    private readonly validateControlService: ValidateControlService,
    private readonly validateConfigurationService: ValidateConfigurationService,
  ) {}

  findAll() {
    return this.systemRepo.findMany({});
  }

  async findOne(systemUuid: string) {
    const system = await this.systemRepo.findUnique({
      where: { uuid: systemUuid },
    });

    if (!system) {
      throw new NotFoundException();
    }

    return system;
  }

  async create(createSystemDto: CreateSystemDto) {
    const {
      path,
      name,
      description,
      enabled,
      controlUuid,
      schemeUuid,
      configurationUuid,
    } = createSystemDto;

    await this.validateEntities({
      controlUuid,
      schemeUuid,
      configurationUuid,
    });

    return this.systemRepo.create({
      data: {
        path,
        name,
        description,
        enabled,
        controlUuid,
        schemeUuid,
        configurationUuid,
      },
    });
  }

  async update(systemUuid: string, updateSystemDto: UpdateSystemDto) {
    const {
      path,
      name,
      description,
      enabled,
      controlUuid,
      schemeUuid,
      configurationUuid,
    } = updateSystemDto;

    await this.validateEntities({
      systemUuid,
      controlUuid,
      schemeUuid,
      configurationUuid,
    });

    return this.systemRepo.update({
      where: { uuid: systemUuid },
      data: {
        path,
        name,
        description,
        enabled,
        controlUuid,
        schemeUuid,
        configurationUuid,
      },
    });
  }

  async remove(systemUuid: string) {
    await this.validateEntities({ systemUuid });

    await this.systemRepo.delete({
      where: { uuid: systemUuid },
    });

    return null;
  }

  private async validateEntities({
    systemUuid,
    schemeUuid,
    controlUuid,
    configurationUuid,
  }: {
    systemUuid?: string;
    schemeUuid?: string;
    controlUuid?: string;
    configurationUuid?: string;
  }) {
    await Promise.all([
      systemUuid && this.validateSystemService.validate(systemUuid),
      schemeUuid && this.validateSchemeService.validate(schemeUuid),
      controlUuid && this.validateControlService.validate(controlUuid),
      configurationUuid &&
        this.validateConfigurationService.validate(configurationUuid),
    ]);
  }
}
