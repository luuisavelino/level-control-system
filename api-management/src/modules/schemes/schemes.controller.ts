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
import { SchemesService } from './schemes.service';
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

  @Get(':uuid')
  @Roles(ADMIN, ENGINEER, USER)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.schemesService.findOne(uuid);
  }

  @Post()
  @Roles(ADMIN, ENGINEER)
  create(@Body() createSchemeDto: CreateSchemeDto) {
    return this.schemesService.create(createSchemeDto);
  }

  @Put(':uuid')
  @Roles(ADMIN, ENGINEER)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateSchemeDto: UpdateSchemeDto,
  ) {
    return this.schemesService.update(uuid, updateSchemeDto);
  }

  @Delete(':uuid')
  @Roles(ADMIN, ENGINEER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.schemesService.remove(uuid);
  }
}
