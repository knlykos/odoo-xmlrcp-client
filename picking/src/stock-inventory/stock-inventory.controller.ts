import { Controller, Get, Query } from '@nestjs/common';
import { StockInventoryService } from './stock-inventory.service';

@Controller('stock-inventory')
export class StockInventoryController {
  constructor(private stockInventoryService: StockInventoryService) {}
  @Get()
  findAll(@Query() query: { offset: number; limit: number }) {
    const data = this.stockInventoryService.findAll(query.offset, query.limit);
    return data;
  }
}
