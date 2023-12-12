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
import { SystemsService } from './services/systems.service';
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

  @Get(':systemUuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('systemUuid', ParseUUIDPipe) systemUuid: string) {
    return this.systemsService.findOne(systemUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemsService.create(createSystemDto);
  }

  @Put(':systemUuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('systemUuid', ParseUUIDPipe) systemUuid: string,
    @Body() updateSystemDto: UpdateSystemDto,
  ) {
    return this.systemsService.update(systemUuid, updateSystemDto);
  }

  @Delete(':systemUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('systemUuid', ParseUUIDPipe) systemUuid: string) {
    return this.systemsService.remove(systemUuid);
  }
}
