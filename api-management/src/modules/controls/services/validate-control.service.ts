import { Injectable, NotFoundException } from '@nestjs/common';
import { ControlsRepository } from 'src/shared/database/repositories/controls.repositories';

@Injectable()
export class ValidateControlService {
  constructor(private readonly controlRepo: ControlsRepository) {}

  async validate(controlUuid: string) {
    const control = await this.controlRepo.findUnique({
      where: { uuid: controlUuid },
    });

    if (!control) {
      throw new NotFoundException('Control not found');
    }
  }
}
