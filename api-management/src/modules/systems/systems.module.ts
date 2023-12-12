import { Module } from '@nestjs/common';
import { SystemsController } from './systems.controller';
import { SystemsService } from './services/systems.service';
import { ValidateSystemService } from './services/validate-systems.service';
import { ValidateSchemeService } from '../schemes/services/validate-scheme.service';
import { ValidateConfigurationService } from '../configurations/services/validate-configuration.service';
import { ValidateControlService } from '../controls/services/validate-control.service';

@Module({
  controllers: [SystemsController],
  providers: [
    SystemsService,
    ValidateSystemService,
    ValidateSchemeService,
    ValidateControlService,
    ValidateConfigurationService,
  ],
  exports: [ValidateSystemService],
})
export class SystemsModule {}
