import { Test, TestingModule } from '@nestjs/testing';
import { StockInventoryService } from './stock-inventory.service';

describe('StockInventoryService', () => {
  let service: StockInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockInventoryService],
    }).compile();

    service = module.get<StockInventoryService>(StockInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
