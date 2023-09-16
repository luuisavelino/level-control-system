import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserByUuid(userUuid: string) {
    return userUuid;
  }
}
