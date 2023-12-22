import { Module } from '@nestjs/common';
import { SystemsLevelGateway } from './systems-level.gateway';
import { SystemsLevelService } from './systems-level.service';

@Module({
  providers: [SystemsLevelGateway, SystemsLevelService],
})
export class SystemsLevelModule {}
