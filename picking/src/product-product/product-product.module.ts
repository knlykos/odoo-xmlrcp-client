import { Module } from '@nestjs/common';
import { ProductProductService } from './product-product.service';

@Module({
  providers: [ProductProductService],
})
export class ProductProductModule {}
