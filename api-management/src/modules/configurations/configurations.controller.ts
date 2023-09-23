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
import { ConfigurationsService } from './services/configurations.service';
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

  @Get(':configurationUuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(
    @Param('configurationUuid', ParseUUIDPipe) configurationUuid: string,
  ) {
    return this.configurationsService.findOne(configurationUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationsService.create(createConfigurationDto);
  }

  @Put(':configurationUuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('configurationUuid', ParseUUIDPipe) configurationUuid: string,
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ) {
    return this.configurationsService.update(
      configurationUuid,
      updateConfigurationDto,
    );
  }

  @Delete(':configurationUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('configurationUuid', ParseUUIDPipe) configurationUuid: string) {
    return this.configurationsService.remove(configurationUuid);
  }
}
