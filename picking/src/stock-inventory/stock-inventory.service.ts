import { Injectable, Controller } from '@nestjs/common';
import { OdooParams, OdooFilters, Odoo } from '../../../odoo';
import { odooConfig } from './../shared/config/odoo-config';
import { StockInventoryLineOut } from 'src/shared/models/stock-inventory-line.models';
import { ProductProductOut } from 'src/shared/models/product-product.models';

@Injectable()
export class StockInventoryService {
  stockInventoryLine: StockInventoryLineOut[] = [];
  async findAll(offset: number, limit: number) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory',
      method: 'search_read',
      params: [],
      filters: { offset: 0, limit: 20 },
    };
    const odoo = new Odoo(odooConfig);
    return await odoo.executeKW(odooFilters);
  }

  async findAllDetails(inventoryId: number): Promise<any[]> {

    const odooFilters: OdooFilters = {
      model: 'stock.inventory.line',
      method: 'search_read',
      params: [[['inventory_id', '=', 1]]],
      filters: {},
    };
    const odoo = new Odoo(odooConfig);
    this.stockInventoryLine = (await odoo.executeKW(
      odooFilters,
    )) as StockInventoryLineOut[];
    console.log(1);
    const promise = this.stockInventoryLine.map(async (v, i, a) => {
      console.log(2);
      const product = await this.findOneProductProduct(v
        .product_id[0] as number);
      this.stockInventoryLine[i].products = product;
    });
    await Promise.all(promise);
    console.log(4);
    return this.stockInventoryLine;
  }

  async findOneProductProduct(productId: number): Promise<ProductProductOut[]> {
    const odoo = new Odoo(odooConfig);
    const odooFilters2: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['id', '=', productId]]],
    };
    const product = (await odoo.executeKW(odooFilters2)) as ProductProductOut[];
    console.log(3);
    return product;
  }
}
