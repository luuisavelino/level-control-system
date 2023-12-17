import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
import { SystemsRepository } from 'src/shared/database/repositories/systems.repositories';
import { ValidateSystemService } from './validate-systems.service';
import { ValidateSchemeService } from 'src/modules/schemes/services/validate-scheme.service';
import { ValidateConfigurationService } from 'src/modules/configurations/services/validate-configuration.service';
import { ValidateControlService } from 'src/modules/controls/services/validate-control.service';
import { EditSystemDto } from '../dto/edit-system.dto';
import { SchemesService } from 'src/modules/schemes/services/schemes.service';
import { ControlsService } from 'src/modules/controls/services/controls.service';
import { ControlType } from 'src/modules/controls/entities/ControlType';

@Injectable()
export class SystemsService {
  constructor(
    private readonly systemRepo: SystemsRepository,
    private readonly validateSchemeService: ValidateSchemeService,
    private readonly validateSystemService: ValidateSystemService,
    private readonly validateControlService: ValidateControlService,
    private readonly validateConfigurationService: ValidateConfigurationService,
    private readonly schemesService: SchemesService,
    private readonly controlService: ControlsService,
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

  async findOneWithRelations(systemUuid: string) {
    const system = await this.systemRepo.findUnique({
      where: { uuid: systemUuid },
      include: {
        Control: true,
        Scheme: true,
        Configuration: {
          include: {
            Notification: true,
            Schedule: true,
          },
        },
      },
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

  async edit(systemUuid: string, editSystemDto: EditSystemDto) {
    const {
      enabled,
      setpoint,
      type,
      kp,
      ki,
      kd,
      editGroupControl,
      editGroupScheme,
    } = editSystemDto;

    const system = await this.findOne(systemUuid);

    const [scheme, control] = await Promise.all([
      this.#editScheme({
        schemeUuid: system.schemeUuid,
        setpoint,
        editGroupScheme,
      }),
      this.#editControl({
        controlUuid: system.controlUuid,
        type,
        kp,
        ki,
        kd,
        editGroupControl,
      }),
    ]);

    await this.update(systemUuid, {
      ...system,
      enabled,
      controlUuid: control.uuid,
      schemeUuid: scheme.uuid,
    });
  }

  async #editScheme({
    schemeUuid,
    setpoint,
    editGroupScheme,
  }: {
    schemeUuid: string;
    setpoint: number;
    editGroupScheme: boolean;
  }) {
    const scheme = await this.schemesService.findOne(schemeUuid);
    if (editGroupScheme) {
      return this.schemesService.update(schemeUuid, { ...scheme, setpoint });
    }

    return this.schemesService.create({
      name: `New Scheme - ${scheme.name}`,
      description: `Scheme created by system from group ${scheme.name}`,
      setpoint,
      minLevel: scheme.minLevel,
      maxLevel: scheme.maxLevel,
    });
  }

  async #editControl({
    controlUuid,
    type,
    kp,
    ki,
    kd,
    editGroupControl,
  }: {
    controlUuid: string;
    type: ControlType;
    kp: number;
    ki: number;
    kd: number;
    editGroupControl: boolean;
  }) {
    const control = await this.controlService.findOne(controlUuid);
    if (editGroupControl) {
      return this.controlService.update(controlUuid, {
        ...control,
        type,
        kp,
        ki,
        kd,
      });
    }

    return this.controlService.create({
      name: `New Control - ${control.name}`,
      description: `Control created by system from group ${control.name}`,
      type,
      kp,
      ki,
      kd,
    });
  }
}
