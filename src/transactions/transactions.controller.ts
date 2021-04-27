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
  Query,
} from '@nestjs/common';
import { Express } from 'express';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchDto } from '../transactions/dto/search.dto';
import { imageFileFilter, storage } from 'src/middleware/UploadImage';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('paper', { storage: storage, fileFilter: imageFileFilter }),
  )
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createTransactionDto.paper = file.path;
    }
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(@Query() page:number) {
    return await this.transactionsService.findAll(page);
  }
  @Get('search')
  async search(@Query() search: SearchDto) {
    return await this.transactionsService.search(search);
  }
  @Get('dashboard')
  async dashboard() {
    return await this.transactionsService.dashboard();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.transactionsService.remove(id);
  }
}
