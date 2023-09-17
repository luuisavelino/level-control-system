import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SystemsService } from './systems.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';
@Controller('systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @Get()
  @Roles(ADMIN, ENGINEER, USER)
  findAll() {
    return this.systemsService.findAll();
  }

  @Get(':uuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.systemsService.findOne(uuid);
  }
  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemsService.create(createSystemDto);
  }

  @Put(':uuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateSystemDto: UpdateSystemDto,
  ) {
    return this.systemsService.update(uuid, updateSystemDto);
  }

  @Delete(':uuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.systemsService.remove(uuid);
  }
}
