import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { SystemsRepository } from 'src/shared/database/repositories/systems.repositories';

@Injectable()
export class SystemsService {
  constructor(private readonly systemRepo: SystemsRepository) {}

  findAll() {
    return this.systemRepo.findMany({});
  }

  findOne(uuid: string) {
    return this.systemRepo.findUnique({
      where: { uuid },
    });
  }

  create(createSystemDto: CreateSystemDto) {
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
