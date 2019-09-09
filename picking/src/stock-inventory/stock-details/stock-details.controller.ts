import { Controller, Get, Query } from '@nestjs/common';
import { StockInventoryService } from '../stock-inventory.service';

@Controller('stock-inventory/stock-details')
// Route
export class StockDetailsController {
  constructor(private stockInventoryService: StockInventoryService) {}
  @Get('')
  async findAllDetails(@Query('inventory_id') inventoryId: number) {
    console.log('inventoryId', inventoryId);
    const data = await this.stockInventoryService.findAllDetails(
      Number(inventoryId),
    );
    return data;
  }
  @Get('/get-product-by-id')
  async findOneProductById(@Query('product_id') productId: number) {
    const data = await this.stockInventoryService.findOneProductById(productId);
    return data;
  }

  @Get('/get-product-by-filters')
  async findOneProductByFilters(@Query('value') value: string) {
    const data = await this.stockInventoryService.findOneProductByFilters(
      value,
    );
    return data;
  }
}
