import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dealer, DealerDoc } from './dealer.model';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';

@Injectable()
export class DealerService {
  constructor(@InjectModel(Dealer.name) private dealer: Model<DealerDoc>) {}
  async create(createDealerDto: CreateDealerDto) {
    return new this.dealer(createDealerDto).save();
  }

  findAll() {
    return this.dealer.find();
  }

  findOne(id: string) {
    return this.dealer.findById(id);
  }

  update(id: string, updateDealerDto: UpdateDealerDto) {
    return this.dealer.findByIdAndUpdate(
      id,
      { updateDealerDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.dealer.findByIdAndDelete(id);
  }
  count() {
    return this.dealer.count();
  }
  findByname(name: string) {
    return this.dealer.findOne({ name: name });
  }
}
