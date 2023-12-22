import { Injectable } from '@nestjs/common';
import { SystemsLevelRepository } from 'src/shared/database/repositories/systems-level.respositories';

@Injectable()
export class SystemsLevelService {
  constructor(private readonly systemLevelRepo: SystemsLevelRepository) {}

  async findOne(id: any) {
    console.log(id);
    this.systemLevelRepo.writeData('test', '10');

    console.log(await this.systemLevelRepo.getData('test', 'used_percent'));

    return `This action returns a systemsLevel`;
  }
}
