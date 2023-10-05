import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemsLevelDto } from './create-systems-level.dto';

export class UpdateSystemsLevelDto extends PartialType(CreateSystemsLevelDto) {
  id: number;
}
