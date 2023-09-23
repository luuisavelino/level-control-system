import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemsRepository } from 'src/shared/database/repositories/systems.repositories';

@Injectable()
export class ValidateSystemService {
  constructor(private readonly systemRepo: SystemsRepository) {}

  async validate(uuid: string) {
    const system = await this.systemRepo.findUnique({
      where: { uuid },
    });

    if (!system) {
      throw new NotFoundException();
    }

    return system;
  }
}
