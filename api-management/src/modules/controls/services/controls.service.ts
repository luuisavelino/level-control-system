import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateControlDto } from '../dto/create-control.dto';
import { UpdateControlDto } from '../dto/update-control.dto';
import { ControlsRepository } from 'src/shared/database/repositories/controls.repositories';
import { ValidateControlService } from './validate-control.service';

@Injectable()
export class ControlsService {
  constructor(
    private readonly controlRepo: ControlsRepository,
    private readonly validateControlService: ValidateControlService,
  ) {}

  findAll() {
    return this.controlRepo.findMany({});
  }

  async findOne(controlUuid: string) {
    await this.validateControlService.validate(controlUuid);

    const control = await this.controlRepo.findUnique({
      where: { uuid: controlUuid },
    });

    if (!control) {
      throw new NotFoundException();
    }

    return control;
  }

  create(createControlDto: CreateControlDto) {
    const { name, description, type, kp, ki, kd } = createControlDto;

    return this.controlRepo.create({
      data: {
        name,
        description,
        type,
        kp,
        ki,
        kd,
      },
    });
  }

  async update(controlUuid: string, updateControlDto: UpdateControlDto) {
    await this.validateControlService.validate(controlUuid);

    const { name, description, type, kp, ki, kd } = updateControlDto;

    return this.controlRepo.update({
      where: { uuid: controlUuid },
      data: {
        name,
        description,
        type,
        kp,
        ki,
        kd,
      },
    });
  }

  async remove(controlUuid: string) {
    await this.validateControlService.validate(controlUuid);

    await this.controlRepo.delete({
      where: { uuid: controlUuid },
    });

    return null;
  }
}
