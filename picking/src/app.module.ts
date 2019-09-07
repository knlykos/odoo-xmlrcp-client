import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';

@Module({
  imports: [StockInventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
