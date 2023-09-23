import { Module } from '@nestjs/common';
import { ControlsService } from './services/controls.service';
import { ControlsController } from './controls.controller';
import { ValidateControlService } from './services/validate-control.service';

@Module({
  controllers: [ControlsController],
  providers: [ControlsService, ValidateControlService],
  exports: [ValidateControlService],
})
export class ControlsModule {}
