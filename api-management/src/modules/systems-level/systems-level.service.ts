import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemsLevelService {
  findOne(id: number) {
    return `This action returns a #${id} systemsLevel`;
  }
}
