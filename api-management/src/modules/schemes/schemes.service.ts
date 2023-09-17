import { Injectable } from '@nestjs/common';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { UpdateSchemeDto } from './dto/update-scheme.dto';
import { SchemesRepository } from 'src/shared/database/repositories/schemes.repositories';

@Injectable()
export class SchemesService {
  constructor(private readonly schemeRepo: SchemesRepository) {}

  findAll() {
    return this.schemeRepo.findMany({});
  }

  findOne(uuid: string) {
    return this.schemeRepo.findUnique({
      where: { uuid },
    });
  }

  create(createSchemeDto: CreateSchemeDto) {
    return this.schemeRepo.create({
      data: createSchemeDto,
    });
  }

  update(uuid: string, updateSchemeDto: UpdateSchemeDto) {
    const { name, description, setpoint, minLevel, maxLevel } = updateSchemeDto;

    return this.schemeRepo.update({
      where: { uuid },
      data: {
        name,
        description,
        setpoint,
        minLevel,
        maxLevel,
      },
    });
  }

  async remove(uuid: string) {
    await this.schemeRepo.delete({
      where: { uuid },
    });

    return null;
  }
}
