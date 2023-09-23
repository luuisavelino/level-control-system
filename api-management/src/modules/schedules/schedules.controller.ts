import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SchedulesService } from './services/schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  @Roles(ADMIN, ENGINEER, USER)
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':scheduleUuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('scheduleUuid', ParseUUIDPipe) scheduleUuid: string) {
    return this.schedulesService.findOne(scheduleUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Put(':scheduleUuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('scheduleUuid', ParseUUIDPipe) scheduleUuid: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(scheduleUuid, updateScheduleDto);
  }

  @Delete(':scheduleUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('scheduleUuid', ParseUUIDPipe) scheduleUuid: string) {
    return this.schedulesService.remove(scheduleUuid);
  }
}
