import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  influxDbUrl: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_influx_db_token')
  influxDbtoken: string;

  @IsString()
  @IsNotEmpty()
  influxDbOrg: string;

  @IsString()
  @IsNotEmpty()
  influxDbBucket: string;
}

export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  influxDbUrl: process.env.INFLUXDB_URL,
  influxDbtoken: process.env.INFLUXDB_TOKEN,
  influxDbOrg: process.env.INFLUXDB_ORG,
  influxDbBucket: process.env.INFLUXDB_BUCKET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
