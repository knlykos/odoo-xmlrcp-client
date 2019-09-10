import { Controller, Get, Query } from '@nestjs/common';
import { StockInventoryService } from '../stock-inventory.service';

@Controller('stock-inventory/stock-details')
// Route
export class StockDetailsController {
  constructor(private stockInventoryService: StockInventoryService) {}
  // http://localhost:3000/stock-inventory/stock-details
  @Get('')
  async findAllDetails(@Query('inventory_id') inventoryId: number) {
    console.log('inventoryId', inventoryId);
    const data = await this.stockInventoryService.findAllDetails(
      Number(inventoryId),
    );
    return data;
  }
  // http://localhost:3000/stock-inventory/stock-details/get-product-by-id?product_id=1
  @Get('/get-product-by-id')
  async findOneProductById(@Query('product_id') productId: number) {
    const data = await this.stockInventoryService.findOneProductById(productId);
    return data;
  }
  // http://localhost:3000/stock-inventory/stock-details/get-product-by-filters?value=ValordeBusqueda
  // ValordeBusqueda = barcode || default_code || name
  @Get('/get-product-by-filters')
  async findOneProductByFilters(@Query('value') value: string) {
    const data = await this.stockInventoryService.findOneProductByFilters(
      value,
    );
    return data;
  }
}
