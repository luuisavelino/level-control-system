import { Injectable } from '@nestjs/common';
import { SystemsLevelRepository } from 'src/shared/database/repositories/systems-level.respositories';

@Injectable()
export class SystemsLevelService {
  constructor(private readonly systemLevelRepo: SystemsLevelRepository) {}

  async findOne(client: any, data: any) {
    console.log('findOne', data);

    clearInterval(client.intervalId);
    const interval = setInterval(() => {
      this.systemLevelRepo.getData('test', 'used_percent').then((result) => {
        console.log('result', result[0]);
        client.emit('events', result[0]);
      });
    }, 1000);

    client.intervalId = interval;

    return;
  }
}
