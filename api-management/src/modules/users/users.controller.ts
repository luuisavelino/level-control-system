import { Controller, Param, Body, Get, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserInfo } from 'src/shared/decorators/ActiveUserInfo';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers(@ActiveUserInfo() userInfo: { userUuid: string; roleId: string }) {
    console.log(userInfo);
    return this.usersService.getUsers();
  }

  @Get('me')
  me(@ActiveUserInfo() userInfo: { userUuid: string; roleId: string }) {
    return this.usersService.me(userInfo.userUuid);
  }

  @Get(':uuid')
  getUserByUuid(
    @ActiveUserInfo() userInfo: { userUuid: string; roleId: string },
    @Param('uuid') uuid: string,
  ) {
    return this.usersService.getUserByUuid(uuid);
  }

  @Patch(':uuid')
  editUserByUuid(
    @ActiveUserInfo() userInfo: { userUuid: string; roleId: string },
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.editUserByUuid(uuid, updateUserDto);
  }

  @Delete(':uuid')
  deleteUserByUuid(
    @ActiveUserInfo() userInfo: { userUuid: string; roleId: string },
    @Param('uuid') uuid: string,
  ) {
    return this.usersService.deleteUserByUuid(uuid);
  }
}
