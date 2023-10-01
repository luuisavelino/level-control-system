import { Injectable, OnModuleInit } from '@nestjs/common';
// import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxDbService implements OnModuleInit {
  async onModuleInit() {
    // await this.$connect();
  }
}
