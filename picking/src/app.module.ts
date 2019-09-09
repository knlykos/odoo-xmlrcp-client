import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { ProductProductModule } from './product-product/product-product.module';

@Module({
  imports: [StockInventoryModule, ProductProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
