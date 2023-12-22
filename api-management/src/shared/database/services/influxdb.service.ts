import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  InfluxDB,
  QueryApi,
  WriteApi,
  flux,
  Point,
} from '@influxdata/influxdb-client';
import { PingAPI } from '@influxdata/influxdb-client-apis';
import { env } from 'src/shared/config/env';

@Injectable()
export class InfluxDbService implements OnModuleInit {
  private influxDB: InfluxDB;
  private queryApi: QueryApi;
  private writeApi: WriteApi;

  async onModuleInit() {
    this.influxDB = new InfluxDB({
      url: env.influxDbUrl,
      token: env.influxDbtoken,
      timeout: 5000,
    });

    this.queryApi = this.influxDB.getQueryApi(env.influxDbOrg);
    this.writeApi = this.influxDB.getWriteApi(
      env.influxDbOrg,
      env.influxDbBucket,
    );

    const pingAPI = new PingAPI(this.influxDB);
    pingAPI.getPing().catch((error) => {
      throw new Error(`InfluxDB unreachable: ${error}`);
    });
  }

  async getMeasurementData(measurement: string, field: string) {
    const query = flux`from(bucket: "${env.influxDbBucket}") 
    |> range(start: -1d)
    |> filter(fn: (r) => r._field == "${field}")
    |> filter(fn: (r) => r._measurement == "${measurement}")`;

    return this.queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
      },
      error(error) {
        console.error(error);
        console.log('Finished ERROR');
      },
      complete() {
        console.log('Finished SUCCESS');
      },
    });
  }

  async writeMeasurement(measurement: string, data: string) {
    console.log(measurement, data);
    const point = new Point(measurement).floatField('used_percent', data);
    this.writeApi.writePoint(point);
    this.writeApi;
    // .close()
    // .then(() => {
    //   console.log('FINISHED');
    // })
    // .catch((e) => {
    //   console.error(e);
    //   console.log('\\nFinished ERROR');
    // });
  }

  async createContinuousQuery(query: string) {
    console.log(query);
    return Promise.resolve();
  }
}
