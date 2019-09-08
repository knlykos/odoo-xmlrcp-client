import { Controller, Get, Query } from '@nestjs/common';
import { StockInventoryService } from '../stock-inventory.service';

@Controller('stock-inventory/stock-details')
// Route
export class StockDetailsController {
  constructor(private stockInventoryService: StockInventoryService) {}
  @Get()
  async findAllDetails(@Query('inventory_id') inventoryId: number) {
    const data = await this.stockInventoryService.findAllDetails(
      Number(inventoryId),
    );
    return data;
  }
}
