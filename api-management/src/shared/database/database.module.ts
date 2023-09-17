import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { SystemsRepository } from './repositories/systems.repositories';
import { SchemesRepository } from './repositories/schemes.repositories';
import { ControlsRepository } from './repositories/controls.repositories';
import { ConfigurationsRepository } from './repositories/configurations.repositories';
import { SchedulesRepository } from './repositories/schedule.repositories';
import { NotificationsRepository } from './repositories/notifications.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    SystemsRepository,
    SchemesRepository,
    ControlsRepository,
    ConfigurationsRepository,
    SchedulesRepository,
    NotificationsRepository,
  ],
  exports: [
    UsersRepository,
    SystemsRepository,
    SchemesRepository,
    ControlsRepository,
    ConfigurationsRepository,
    SchedulesRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
