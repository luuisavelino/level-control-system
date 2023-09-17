import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { ControlsRepository } from 'src/shared/database/repositories/controls.repositories';

@Injectable()
export class ControlsService {
  constructor(private readonly controlRepo: ControlsRepository) {}

  findAll() {
    return this.controlRepo.findMany({});
  }

  async findOne(uuid: string) {
    const control = await this.controlRepo.findUnique({
      where: { uuid },
    });

    if (!control) {
      throw new NotFoundException();
    }

    return control;
  }

  create(createControlDto: CreateControlDto) {
    return this.controlRepo.create({
      data: createControlDto,
    });
  }

  update(uuid: string, updateControlDto: UpdateControlDto) {
    const { name, description, type, kp, ki, kd } = updateControlDto;

    return this.controlRepo.update({
      where: { uuid },
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

  async remove(uuid: string) {
    await this.controlRepo.delete({
      where: { uuid },
    });

    return null;
  }
}
