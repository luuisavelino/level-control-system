import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { InfluxDbService } from './services/influxdb.service';
import { UsersRepository } from './repositories/users.repositories';
import { SystemsRepository } from './repositories/systems.repositories';
import { SchemesRepository } from './repositories/schemes.repositories';
import { ControlsRepository } from './repositories/controls.repositories';
import { ConfigurationsRepository } from './repositories/configurations.repositories';
import { SchedulesRepository } from './repositories/schedules.repositories';
import { NotificationsRepository } from './repositories/notifications.repositories';
import { SystemsLevelRepository } from './repositories/systems-level.respositories';

@Global()
@Module({
  providers: [
    PrismaService,
    InfluxDbService,
    UsersRepository,
    SystemsRepository,
    SchemesRepository,
    ControlsRepository,
    ConfigurationsRepository,
    SchedulesRepository,
    NotificationsRepository,
    SystemsLevelRepository,
  ],
  exports: [
    UsersRepository,
    SystemsRepository,
    SchemesRepository,
    ControlsRepository,
    ConfigurationsRepository,
    SchedulesRepository,
    NotificationsRepository,
    SystemsLevelRepository,
  ],
})
export class DatabaseModule {}
