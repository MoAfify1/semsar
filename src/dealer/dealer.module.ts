import { Module } from '@nestjs/common';
import { DealerService } from './dealer.service';
import { DealerController } from './dealer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dealer, DealerSchema } from './dealer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dealer.name, schema: DealerSchema }]),
  ],
  controllers: [DealerController],
  providers: [DealerService],
  exports: [DealerService],
})
export class DealerModule {}
