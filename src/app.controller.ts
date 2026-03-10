import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cafes')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  async getCafeInfo(@Query('name') name: string) {
    return await this.appService.cafeSearch(name);
  }
}