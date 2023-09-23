import { Module } from '@nestjs/common';
import { ConfigurationsService } from './services/configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { ValidateConfigurationService } from './services/validate-configuration.service';

@Module({
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService, ValidateConfigurationService],
  exports: [ValidateConfigurationService],
})
export class ConfigurationsModule {}
