import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async getTest(@Query('name') name: string) {
    return await this.appService.cafeSearch(name);
  }
}