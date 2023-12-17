import { Module } from '@nestjs/common';
import { SystemsController } from './systems.controller';
import { SystemsService } from './services/systems.service';
import { ValidateSystemService } from './services/validate-systems.service';
import { ValidateSchemeService } from '../schemes/services/validate-scheme.service';
import { ValidateConfigurationService } from '../configurations/services/validate-configuration.service';
import { ValidateControlService } from '../controls/services/validate-control.service';
import { SchemesService } from '../schemes/services/schemes.service';
import { ControlsService } from '../controls/services/controls.service';

@Module({
  controllers: [SystemsController],
  providers: [
    SystemsService,
    ValidateSystemService,
    ValidateSchemeService,
    ValidateControlService,
    ValidateConfigurationService,
    SchemesService,
    ControlsService,
  ],
  exports: [ValidateSystemService],
})
export class SystemsModule {}
