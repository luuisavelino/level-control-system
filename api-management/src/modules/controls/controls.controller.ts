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
import { ControlsService } from './services/controls.service';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';

@Controller('controls')
export class ControlsController {
  constructor(private readonly controlsService: ControlsService) {}

  @Get()
  @Roles(ADMIN, ENGINEER, USER)
  findAll() {
    return this.controlsService.findAll();
  }

  @Get(':controlUuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('controlUuid', ParseUUIDPipe) controlUuid: string) {
    return this.controlsService.findOne(controlUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlsService.create(createControlDto);
  }

  @Put(':controlUuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('controlUuid', ParseUUIDPipe) controlUuid: string,
    @Body() updateControlDto: UpdateControlDto,
  ) {
    return this.controlsService.update(controlUuid, updateControlDto);
  }

  @Delete(':controlUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('controlUuid', ParseUUIDPipe) controlUuid: string) {
    return this.controlsService.remove(controlUuid);
  }
}
