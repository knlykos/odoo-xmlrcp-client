import { Controller, Get, Query } from '@nestjs/common';
import { StockInventoryService } from './stock-inventory.service';

@Controller('stock-inventory')
// Route
export class StockInventoryController {
  constructor(private stockInventoryService: StockInventoryService) {}

  // http://localhost:3000/stock-inventory?offset=1&limit=2
  @Get()
  findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
    const data = this.stockInventoryService.findAll(
      Number(offset),
      Number(limit),
    );
    return data;
  }
}
