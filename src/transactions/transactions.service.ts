import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchDto } from '../transactions/dto/search.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transactions, TransactionsDoc } from './transactions.model';
import { DealerService } from 'src/dealer/dealer.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name) private trans: Model<TransactionsDoc>,
    private client: ClientService,
    private dealer: DealerService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const client = await this.client.nationalId(
      createTransactionDto.nationalId
    );
    createTransactionDto.client = client._id;
    return new this.trans(createTransactionDto).save();
  }

  async findAll(page:number) {
    const length=await this.trans.find().countDocuments()
    const result=await this.trans.find().skip((+page-1)*10).limit(10).populate('client').populate('dealer').exec();
    return {lastPage:Math.ceil(length/10),transations:result}
  }
  async search(search: SearchDto) {
    if (search.nationalId) {
      const client = await this.client.nationalId(search.nationalId);
      search.client = client._id;
      delete search.nationalId;
    }
    return this.trans.find(search);
  }

  findOne(id: string) {
    return this.trans.findById(id);
  }
  async dashboard() {
    //profits
    const profit = await this.trans.find();
    const totalprofit = profit.map((data) => {
      return data.profit;
    });
    const total = totalprofit.reduce((acc, val) => {
      return +acc + +val;
    }, 0);
    //income
    const income = await this.trans.find();
    const totalincome = income.map((data) => {
      return data.sellCash;
    });
    const totalin = totalincome.reduce((acc, val) => {
      return +acc + +val;
    }, 0);
    //outcome
    const outcome = await this.trans.find();
    const totaloutcome = outcome.map((data) => {
      return data.purchaseCash;
    });
    const totalout = totaloutcome.reduce((acc, val) => {
      return +acc + +val;
    }, 0);

    const result = await Promise.all([
      this.client.count(),
      this.dealer.count(),
      this.trans.count(),
    ]);
    return {
      totlaOutcome: totalout,
      totalIncome: totalin,
      profit: total,
      clients: result[0],
      dealers: result[1],
      transactions: result[2],
      qoutaNumber: result[0],
    };
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const sell = +updateTransactionDto.sellCash;

    const result = await this.trans.findOneAndUpdate(
      { _id: id },
      updateTransactionDto,
      { new: true },
    );
    const profit = sell - +result.purchaseCash;
    const dealerObj = {
      name: updateTransactionDto.name,
      phoneNumber: updateTransactionDto.phoneNumber,
    };
    const dealer = await this.dealer.findByname(dealerObj.name);
    if (dealer) {
      return await this.trans.findOneAndUpdate(
        { _id: dealer._id },
        { profit: profit },
        { new: true },
      );
    }
    await this.dealer.create(dealerObj);
    return this.trans.findOneAndUpdate(
      { _id: id },
      { profit: profit },
      { new: true },
    );
  }

  remove(id: string) {
    return this.trans.findByIdAndDelete(id);
  }
}
