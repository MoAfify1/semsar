import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { DealerModule } from './dealer/dealer.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter } from './middleware/UploadImage';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_URL, {
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    AuthModule,
    ClientModule,
    DealerModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
