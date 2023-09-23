import { Module } from '@nestjs/common';
import { SchemesController } from './schemes.controller';
import { SchemesService } from './services/schemes.service';
import { ValidateSchemeService } from './services/validate-scheme.service';

@Module({
  controllers: [SchemesController],
  providers: [SchemesService, ValidateSchemeService],
  exports: [ValidateSchemeService],
})
export class SchemesModule {}
