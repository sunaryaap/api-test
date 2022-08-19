import { Injectable } from '@nestjs/common';
import { CreateDataClientDto } from './dto/create-data-client.dto';
import { UpdateDataClientDto } from './dto/update-data-client.dto';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DataClient } from './entities/data-client.entity';

@Injectable()
export class DataClientService {

  constructor(
    @InjectRepository(DataClient)
    private repository: Repository<DataClient>,
  ) {}

  async create(data): Promise<any> {
    return this.repository.save(data);
  }

  async findAll(relations = []): Promise<any[]> {
    return this.repository.find({ relations });
  }
  
}
