import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { SystemsRepository } from 'src/shared/database/repositories/systems.repositories';

@Injectable()
export class SystemsService {
  constructor(private readonly systemRepo: SystemsRepository) {}

  findAll() {
    return this.systemRepo.findMany({});
  }

  async findOne(uuid: string) {
    const system = await this.systemRepo.findUnique({
      where: { uuid },
    });

    if (!system) {
      throw new NotFoundException();
    }

    return system;
  }

  create(createSystemDto: CreateSystemDto) {
    // TODO:
    // Check if the controlUuid, schemeUuid and configurationUuid exists
    // in the database

    return this.systemRepo.create({
      data: createSystemDto,
    });
  }

  update(uuid: string, updateSystemDto: UpdateSystemDto) {
    const {
      path,
      name,
      description,
      enabled,
      controlUuid,
      schemeUuid,
      configurationUuid,
    } = updateSystemDto;

    return this.systemRepo.update({
      where: { uuid },
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

  async remove(uuid: string) {
    await this.systemRepo.delete({
      where: { uuid },
    });

    return null;
  }
}
