import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DealerService } from './dealer.service';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';

@Controller('dealer')
export class DealerController {
  constructor(private readonly dealerService: DealerService) {}

  @Post()
  create(@Body() createDealerDto: CreateDealerDto) {
    return this.dealerService.create(createDealerDto);
  }

  @Get()
  async findAll() {
    return await this.dealerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dealerService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDealerDto: UpdateDealerDto,
  ) {
    return await this.dealerService.update(id, updateDealerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dealerService.remove(id);
  }
}
