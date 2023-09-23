import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchemeDto } from '../dto/create-scheme.dto';
import { UpdateSchemeDto } from '../dto/update-scheme.dto';
import { SchemesRepository } from 'src/shared/database/repositories/schemes.repositories';
import { ValidateSchemeService } from './validate-scheme.service';

@Injectable()
export class SchemesService {
  constructor(
    private readonly schemeRepo: SchemesRepository,
    private readonly validateSchemeService: ValidateSchemeService,
  ) {}

  findAll() {
    return this.schemeRepo.findMany({});
  }

  async findOne(schemeUuid: string) {
    const scheme = await this.schemeRepo.findUnique({
      where: { uuid: schemeUuid },
    });

    if (!scheme) {
      throw new NotFoundException();
    }

    return scheme;
  }

  create(createSchemeDto: CreateSchemeDto) {
    return this.schemeRepo.create({
      data: createSchemeDto,
    });
  }

  async update(schemeUuid: string, updateSchemeDto: UpdateSchemeDto) {
    await this.validateSchemeService.validate(schemeUuid);

    const { name, description, setpoint, minLevel, maxLevel } = updateSchemeDto;

    return this.schemeRepo.update({
      where: { uuid: schemeUuid },
      data: {
        name,
        description,
        setpoint,
        minLevel,
        maxLevel,
      },
    });
  }

  async remove(schemeUuid: string) {
    await this.validateSchemeService.validate(schemeUuid);

    await this.schemeRepo.delete({
      where: { uuid: schemeUuid },
    });

    return null;
  }
}
