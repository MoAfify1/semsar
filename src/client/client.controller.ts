import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpException,
  HttpStatus,
  Query
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, storage } from 'src/middleware/UploadImage';
import { SearchDto } from 'src/client/dto/search.dto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FilesDto } from './dto/files.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
/*   @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'nationaIdImage', maxCount: 1 },
        { name: 'taxCardImage', maxCount: 1 },
        { name: 'insuranceImage', maxCount: 1 },
        { name: 'commericalRecordImage', maxCount: 1 },
      ],
      { storage: storage, fileFilter: imageFileFilter },
    ),
  ) */
  async create(
    @Body() createClientDto: CreateClientDto
   // @UploadedFiles() files: FilesDto,
  ) {
    /* JSON.parse(JSON.stringify(files));

    if (
      files.nationaIdImage &&
      files.taxCardImage &&
      files.insuranceImage &&
      files.commericalRecordImage
    ) {
      createClientDto.nationaIdImage = `${files.nationaIdImage[0].path}`;
      createClientDto.taxCardImage = `${files.taxCardImage[0].path}`;
      createClientDto.insuranceImage = `${files.insuranceImage[0].path}`;
      createClientDto.commericalRecordImage = `${files.commericalRecordImage[0].path}`;
      return this.clientService.create(createClientDto);
    } else { */
      return this.clientService.create(createClientDto);    }
  //}

  @Get()
  async findAll(@Query() search: SearchDto,@Query('page') page:number) {
    return await this.clientService.findAll(search,page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
