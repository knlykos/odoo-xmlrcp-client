import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { StockInventoryService } from './stock-inventory.service';
import { StockInventoryOut } from 'src/shared/models/stock-inventory.model';
import { StockInventoryResponse } from 'src/shared/models/response.model';

@Controller('stock-inventory')
// Route
export class StockInventoryController {
  constructor(private stockInventoryService: StockInventoryService) {}

  // http://localhost:3000/stock-inventory?offset=1&limit=2
  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.findAll(
        Number(offset),
        Number(limit),
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }

  @Get('/stock-inventory-by-id')
  async findAllByIdStockInventory(@Query('id') id: number) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.findAllByIdStockInventory(
        id,
      );
    } catch (error) {
      resApi.error = error;
    }

    return resApi;
  }

  @Post()
  async createInventoryStock(@Body() stockInventoryOut: StockInventoryOut) {
    const resApi: StockInventoryResponse = {
      data: [],
      message: '',
      error: '',
    };
    try {
      resApi.data = await this.stockInventoryService.createInventoryStock(
        stockInventoryOut,
      );
    } catch (error) {
      resApi.error = error;
    }
    return resApi;
  }
}
