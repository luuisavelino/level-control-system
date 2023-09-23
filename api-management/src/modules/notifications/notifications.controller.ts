import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @Roles(ADMIN, ENGINEER, USER)
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':notificationUuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('notificationUuid', ParseUUIDPipe) notificationUuid: string) {
    return this.notificationsService.findOne(notificationUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Put(':notificationUuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('notificationUuid', ParseUUIDPipe) notificationUuid: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(
      notificationUuid,
      updateNotificationDto,
    );
  }

  @Delete(':notificationUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('notificationUuid', ParseUUIDPipe) notificationUuid: string) {
    return this.notificationsService.remove(notificationUuid);
  }
}
