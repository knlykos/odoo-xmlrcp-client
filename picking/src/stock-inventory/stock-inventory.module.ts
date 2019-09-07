import { Module } from '@nestjs/common';
import { StockInventoryController } from './stock-inventory.controller';
import { StockInventoryService } from './stock-inventory.service';
import { StockDetailsController } from './stock-details/stock-details.controller';

@Module({
  controllers: [StockInventoryController, StockDetailsController],
  providers: [StockInventoryService],
})
export class StockInventoryModule {}
