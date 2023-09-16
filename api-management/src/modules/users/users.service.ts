import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async me(userUuid: string) {
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

  async getUsers() {
    const users = await this.usersRepo.findAll({
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return users;
  }

  async getUserByUuid(uuid: string) {
    const user = await this.usersRepo.findUnique({
      where: { uuid },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
  }

  async editUserByUuid(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findUnique({
      where: { uuid },
      select: {
        uuid: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const userUpdated = await this.usersRepo.update({
      where: { uuid },
      data: updateUserDto,
    });

    return {
      name: `${userUpdated.firstName} ${userUpdated.lastName}`,
      email: userUpdated.email,
    };
  }

  async deleteUserByUuid(uuid: string) {
    const user = await this.usersRepo.findUnique({
      where: { uuid },
      select: {
        uuid: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const userDeleted = await this.usersRepo.delete({
      where: { uuid },
    });

    return {
      name: `${userDeleted.firstName} ${userDeleted.lastName}`,
      email: userDeleted.email,
    };
  }
}
