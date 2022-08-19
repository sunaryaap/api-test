import { PartialType } from '@nestjs/mapped-types';
import { CreateDataClientDto } from './create-data-client.dto';

export class UpdateDataClientDto extends PartialType(CreateDataClientDto) {}
