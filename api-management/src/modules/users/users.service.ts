import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserByUuid(userUuid: string) {
    const user = await this.usersRepo.findUnique({
      where: { uuid: userUuid },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
  }
}
