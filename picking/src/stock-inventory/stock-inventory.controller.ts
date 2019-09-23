import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { StockInventoryService } from './stock-inventory.service';
import { StockInventoryOut } from 'src/shared/models/stock-inventory.model';

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

  @Get('/stock-inventory-by-id')
  findAllByIdStockInventory(@Query('id') id: number) {
    const data = this.stockInventoryService.findAllByIdStockInventory(id);
    return data;
  }

  @Post()
  createInventoryStock(@Body() stockInventoryOut: StockInventoryOut) {
    console.log(stockInventoryOut);
    const data = this.stockInventoryService.createInventoryStock(
      stockInventoryOut,
    );
    return data;
  }
}
