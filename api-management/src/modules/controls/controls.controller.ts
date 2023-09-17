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
import { ControlsService } from './controls.service';
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

  @Get(':uuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.controlsService.findOne(uuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlsService.create(createControlDto);
  }

  @Put(':uuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateControlDto: UpdateControlDto,
  ) {
    return this.controlsService.update(uuid, updateControlDto);
  }

  @Delete(':uuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.controlsService.remove(uuid);
  }
}
