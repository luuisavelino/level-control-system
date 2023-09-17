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
import { ConfigurationsService } from './configurations.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Get()
  @Roles(ADMIN, ENGINEER, USER)
  findAll() {
    return this.configurationsService.findAll();
  }

  @Get(':uuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.configurationsService.findOne(uuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationsService.create(createConfigurationDto);
  }

  @Put(':uuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ) {
    return this.configurationsService.update(uuid, updateConfigurationDto);
  }

  @Delete(':uuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.configurationsService.remove(uuid);
  }
}
