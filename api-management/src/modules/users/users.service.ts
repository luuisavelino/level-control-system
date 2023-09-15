import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const usernameTaken = await this.usersRepo.findUnique({
      where: { email: createUserDto.email },
    });

    if (usernameTaken) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 12);

    const user = await this.usersRepo.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        city: createUserDto.city,
        state: createUserDto.state,
        country: createUserDto.country,
        phoneNumber: createUserDto.phoneNumber,
        phoneRegionCode: createUserDto.phoneRegionCode,
        phoneCountryCode: createUserDto.phoneCountryCode,
        roleId: 1,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
