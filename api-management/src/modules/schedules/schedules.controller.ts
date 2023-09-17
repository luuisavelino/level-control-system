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
import { SchedulesService } from './schedules.service';
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

  @Get(':uuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.schedulesService.findOne(uuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Put(':uuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(uuid, updateScheduleDto);
  }

  @Delete(':uuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.schedulesService.remove(uuid);
  }
}
