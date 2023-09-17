import {
  Controller,
  Param,
  Body,
  Get,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserInfo } from 'src/shared/decorators/active-user-info.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Roles(ADMIN)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('me')
  @Roles(ADMIN, ENGINEER, USER)
  me(@ActiveUserInfo() userInfo: { userUuid: string; role: string }) {
    return this.usersService.me(userInfo.userUuid);
  }

  @Get(':uuid')
  @Roles(ADMIN)
  getUserByUuid(@Param('uuid') uuid: string) {
    return this.usersService.getUserByUuid(uuid);
  }

  @Put(':uuid')
  @Roles(ADMIN)
  editUserByUuid(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.editUserByUuid(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Roles(ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserByUuid(@Param('uuid') uuid: string) {
    return this.usersService.deleteUserByUuid(uuid);
  }
}
