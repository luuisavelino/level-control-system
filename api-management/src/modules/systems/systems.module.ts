import { Module } from '@nestjs/common';
import { SystemsController } from './systems.controller';
import { SystemsService } from './services/systems.service';
import { ValidateSystemService } from './services/validate-systems.service';

@Module({
  controllers: [SystemsController],
  providers: [SystemsService, ValidateSystemService],
  exports: [ValidateSystemService],
})
export class SystemsModule {}
