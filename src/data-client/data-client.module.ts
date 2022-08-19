import { Module } from '@nestjs/common';
import { DataClientService } from './data-client.service';
import { DataClientController } from './data-client.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { DataClient } from './entities/data-client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataClient]),
  ],
  controllers: [DataClientController],
  providers: [DataClientService],
  exports: [DataClientService]
})
export class DataClientModule {}
