import { Controller, Get, Query, Body, Post, Put } from '@nestjs/common';
import { StockInventoryService } from '../stock-inventory.service';
import { StockInventoryLineOut } from 'src/shared/models/stock-inventory-line.models';
import { StockInventoryResponse } from 'src/shared/models/response.model';

@Controller('stock-inventory/stock-details')
// Route
export class StockDetailsController {
  constructor(private stockInventoryService: StockInventoryService) {}
  // http://localhost:3000/stock-inventory/stock-details
  @Get('')
  async findAllDetails(@Query('inventory_id') inventoryId: number) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.findAllDetails(
        Number(inventoryId),
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }
  // http://localhost:3000/stock-inventory/stock-details/get-product-by-id?product_id=1
  @Get('/get-product-by-id')
  async findOneProductById(@Query('product_id') productId: number) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.findOneProductById(
        productId,
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }

  @Get('/get-product-by-barcode')
  async findOneProductByBarcode(@Query('barcode') barcode: string) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.findOneProductByBarcode(
        barcode,
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }
  // http://localhost:3000/stock-inventory/stock-details/get-product-by-filters?value=ValordeBusqueda
  // ValordeBusqueda = barcode || default_code || name
  @Get('/get-product-by-filters')
  async findOneProductByFilters(@Query('value') value: string) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.findOneProductByFilters(
        value,
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }
  @Post('')
  async createStockInventoryDetail(
    @Body() stockInventoryLine: StockInventoryLineOut,
  ) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.createStockInventoryDetail(
        stockInventoryLine,
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }
  @Put()
  async updateStockInventoryDetail(
    @Body() stockInventoryLine: StockInventoryLineOut,
  ) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.updateStockInventoryDetail(
        stockInventoryLine,
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }
}
