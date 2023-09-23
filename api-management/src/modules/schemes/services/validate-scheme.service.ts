import { Injectable, NotFoundException } from '@nestjs/common';
import { SchemesRepository } from 'src/shared/database/repositories/schemes.repositories';

@Injectable()
export class ValidateSchemeService {
  constructor(private readonly schemeRepo: SchemesRepository) {}

  async validate(uuid: string) {
    const scheme = await this.schemeRepo.findUnique({
      where: { uuid },
    });

    if (!scheme) {
      throw new NotFoundException();
    }

    return scheme;
  }
}
