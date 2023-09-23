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
import { SchemesService } from './services/schemes.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { UpdateSchemeDto } from './dto/update-scheme.dto';
import {
  ADMIN,
  ENGINEER,
  Roles,
  USER,
} from 'src/shared/decorators/roles.decorator';

@Controller('schemes')
export class SchemesController {
  constructor(private readonly schemesService: SchemesService) {}

  @Get()
  @Roles(ADMIN, ENGINEER, USER)
  findAll() {
    return this.schemesService.findAll();
  }

  @Get(':schmeUuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('schmeUuid', ParseUUIDPipe) schmeUuid: string) {
    return this.schemesService.findOne(schmeUuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createSchemeDto: CreateSchemeDto) {
    return this.schemesService.create(createSchemeDto);
  }

  @Put(':schmeUuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('schmeUuid', ParseUUIDPipe) schmeUuid: string,
    @Body() updateSchemeDto: UpdateSchemeDto,
  ) {
    return this.schemesService.update(schmeUuid, updateSchemeDto);
  }

  @Delete(':schmeUuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('schmeUuid', ParseUUIDPipe) schmeUuid: string) {
    return this.schemesService.remove(schmeUuid);
  }
}
