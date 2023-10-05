import { Module } from '@nestjs/common';
import { SystemsLevelGateway } from './systems-level.gateway';

@Module({
  providers: [SystemsLevelGateway],
})
export class SystemsLevelModule {}
