import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Odoo, OdooParams, OdooFilters } from './../../odoo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const data = await this.appService.getHello();
    return data;
  }
}
