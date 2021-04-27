import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CleintSchema, Client } from './client.model';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter, storage } from 'src/middleware/UploadImage';

@Module({
  imports: [
    MulterModule.register({
      storage: storage,
      fileFilter: imageFileFilter,
    }),
    MongooseModule.forFeature([{ name: Client.name, schema: CleintSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
