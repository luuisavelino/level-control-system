import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemsLevelRepository } from 'src/shared/database/repositories/systems-level.respositories';
import { PopulateSystemsLevelDto } from './dto/populate-systems-level.dto';
import { SystemsRepository } from 'src/shared/database/repositories/systems.repositories';

@Injectable()
export class SystemsLevelService {
  constructor(
    private readonly systemLevelRepo: SystemsLevelRepository,
    private readonly systemRepo: SystemsRepository,
  ) {}

  async populateChart(client: any, options: PopulateSystemsLevelDto) {
    const { systemUuid, interval } = options;

    try {
      const system = await this.systemRepo.findUnique({
        where: { uuid: systemUuid },
      });

      if (!system) {
        client.emit('populate-chart', {
          err: 'System not found',
        });
        return;
      }

      const path = system.path;

      clearInterval(client.chartId);
      const chartId = setInterval(() => {
        this.systemLevelRepo.getData(path, 'used_percent').then((result) => {
          client.emit('populate-chart', result);
        });
      }, 1000);

      client.chartId = chartId;

      return;
    } catch {
      client.emit('populate-chart', {
        err: 'Error to get system',
      });
      return;
    }
  }
}
