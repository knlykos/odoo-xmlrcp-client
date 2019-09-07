import { Test, TestingModule } from '@nestjs/testing';
import { StockDetailsController } from './stock-details.controller';

describe('StockDetails Controller', () => {
  let controller: StockDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockDetailsController],
    }).compile();

    controller = module.get<StockDetailsController>(StockDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
