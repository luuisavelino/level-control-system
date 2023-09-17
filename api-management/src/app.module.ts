import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { SystemsModule } from './modules/systems/systems.module';
import { ConfigurationsModule } from './modules/configurations/configurations.module';
import { ControlsModule } from './modules/controls/controls.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { SchemesModule } from './modules/schemes/schemes.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RolesGuard } from './modules/auth/roles.guard';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    SystemsModule,
    ConfigurationsModule,
    ControlsModule,
    NotificationsModule,
    SchedulesModule,
    SchemesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
