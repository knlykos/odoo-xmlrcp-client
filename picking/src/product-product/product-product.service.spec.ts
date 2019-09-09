import { Test, TestingModule } from '@nestjs/testing';
import { ProductProductService } from './product-product.service';

describe('ProductProductService', () => {
  let service: ProductProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductProductService],
    }).compile();

    service = module.get<ProductProductService>(ProductProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
