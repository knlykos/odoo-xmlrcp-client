import { Controller, Get, Query, Body, Post, Put } from '@nestjs/common';
import { StockInventoryService } from '../stock-inventory.service';
import { StockInventoryLineOut } from 'src/shared/models/stock-inventory-line.models';

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

  @Get('/get-product-by-barcode')
  async findOneProductByBarcode(@Query('barcode') barcode: string) {
    const data = await this.stockInventoryService.findOneProductByBarcode(
      barcode,
    );
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
  @Post('')
  async createStockInventoryDetail(
    @Body() stockInventoryLine: StockInventoryLineOut,
  ) {
    // stockInventoryLine = {
    //   id,
    //   inventory_id,
    //   product_qty,
    //   display_name
    // };
    const data = await this.stockInventoryService.createStockInventoryDetail(
      stockInventoryLine,
    );
    return data;
  }
  @Put()
  async updateStockInventoryDetail(
    @Body() stockInventoryLine: StockInventoryLineOut,
  ) {
    const data = await this.stockInventoryService.updateStockInventoryDetail(
      stockInventoryLine,
    );
    return data;
  }
}
