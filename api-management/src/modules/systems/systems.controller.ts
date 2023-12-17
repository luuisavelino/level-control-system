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
import { EditSystemDto } from './dto/edit-system.dto';
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

  @Get(':systemUuid/detailed')
  @Roles(ADMIN, ENGINEER, USER)
  findOneDetailed(@Param('systemUuid', ParseUUIDPipe) systemUuid: string) {
    return this.systemsService.findOneWithRelations(systemUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemsService.create(createSystemDto);
  }

  @Put(':systemUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
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

  @Put(':systemUuid/edit')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  edit(
    @Param('systemUuid', ParseUUIDPipe) systemUuid: string,
    @Body() editSystemDto: EditSystemDto,
  ) {
    return this.systemsService.edit(systemUuid, editSystemDto);
  }
}
