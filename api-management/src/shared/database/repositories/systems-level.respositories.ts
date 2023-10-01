import { Injectable } from '@nestjs/common';
import { InfluxDbService } from 'src/shared/database/services/influxdb.service';

@Injectable()
export class SystemsLevelRepository {
  constructor(private readonly prismaService: InfluxDbService) {}

  getLevel() {
    return null;
  }
}
