import { Injectable } from '@nestjs/common';
import { InfluxDbService } from 'src/shared/database/services/influxdb.service';

@Injectable()
export class SystemsLevelRepository {
  constructor(private readonly prismaService: InfluxDbService) {}

  getData(measurement: string, field: string) {
    return this.prismaService.getMeasurementData(measurement, field);
  }

  writeData(measurement: string, data: string) {
    return this.prismaService.writeMeasurement(measurement, data);
  }
}
