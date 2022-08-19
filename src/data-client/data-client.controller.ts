import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException } from '@nestjs/common';
import { DataClientService } from './data-client.service';
import { CreateDataClientDto } from './dto/create-data-client.dto';
import * as geoip from 'geoip-lite';
require('dotenv').config({ path: '.env' });

import UAParser = require("ua-parser-js");

@Controller('data-client')
export class DataClientController {
  constructor(private readonly dataClientService: DataClientService) {}
  
  @Post('submit')
  async create(
    @Body() body: CreateDataClientDto,
    @Request() req: any,
  ) {

    const ip = (!process.env.IP_TEST) ? req.socket.remoteAddress : "180.252.165.27";
    const geo = geoip.lookup(ip);
    body.geolocation = JSON.stringify(geo);
    body.remote_address = ip;
    const parser = new UAParser(body.user_agent); 
    body.user_agent = JSON.stringify(parser.getResult());

    await this.dataClientService.create(body).catch(err => {
        throw new BadRequestException(err.message);
    });

    return 'OK';
    
  }

  @Post('all')
  async findAll() {
    const response = await this.dataClientService.findAll();
    const result = [];
    response.forEach(e => {    
      
      let user_agent;
      try {
        user_agent = JSON.parse(e.user_agent)
      } catch (err) {
        user_agent = '';
      }

      let geolocation;
      try {
        geolocation = JSON.parse(e.geolocation)
      } catch (err) {
        geolocation = '';
      }

      result.push({
        "id_device": e.id_device,
        "OS": (user_agent) ? user_agent.os.name : '',
        "Brand": (user_agent) ? (user_agent.device.vendor) ? user_agent.device.vendor : '' : '',
        "Model": (user_agent) ? user_agent.device.model : '',
        "Location": {
          "Country": (geolocation) ? geolocation.country : '',
          "City": (geolocation) ? geolocation.city : '',
        }
      }); 
    });
    return result;
  }

}
