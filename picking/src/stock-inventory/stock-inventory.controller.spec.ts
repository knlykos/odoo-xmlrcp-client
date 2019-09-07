import { Test, TestingModule } from '@nestjs/testing';
import { StockInventoryController } from './stock-inventory.controller';

describe('StockInventory Controller', () => {
  let controller: StockInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockInventoryController],
    }).compile();

    controller = module.get<StockInventoryController>(StockInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
