import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TrasnationsSchema } from './transactions.model';
import { ClientModule } from 'src/client/client.module';
import { DealerService } from 'src/dealer/dealer.service';
import { DealerModule } from 'src/dealer/dealer.module';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter, storage } from 'src/middleware/UploadImage';

@Module({
  imports: [
    MulterModule.register({
      storage: storage,
      fileFilter: imageFileFilter,
    }),
    MongooseModule.forFeature([
      { name: Transactions.name, schema: TrasnationsSchema },
    ]),
    ClientModule,
    DealerModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
