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

  async getMeasurementData(
    measurement: string,
    field: string,
    interval: string,
  ) {
    const point = new Point(measurement).floatField('used_percent', 10);
    this.writeApi.writePoint(point);

    const queryResults = [];

    const fluxQuery = flux`
      from(bucket: "${env.influxDbBucket}") 
      |> range(start: -"${interval})
      |> filter(fn: (r) => r._field == "${field}")
      |> filter(fn: (r) => r._measurement == "${measurement}")
      |> sample(n: 100, pos: 1)
      |> keep(columns: ["_time", "_value"])
    `;

    return new Promise((resolve, reject) => {
      this.queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          queryResults.push({
            time: o._time,
            value: o._value,
          });
        },
        error(error) {
          console.error(error);
          reject(error);
        },
        complete() {
          resolve(queryResults);
        },
      });
    });
  }
}
