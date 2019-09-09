import { Routes, RouterModule } from 'nest-router';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { Module } from '@nestjs/common';

const routes: Routes = [
  {
    path: '/stock-inventory',
    module: StockInventoryModule,
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes), // setup the routes
    StockInventoryModule,
  ], // as usual, nothing new
})
export class ApplicationModule {}
