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

    const promise = this.stockInventoryLine.map(async (v, i, a) => {
      const product = await this.findOneProductById(v.product_id[0] as number);
      this.stockInventoryLine[i].products = product;
    });
    await Promise.all(promise);

    return this.stockInventoryLine;
  }

  async findOneProductById(productId: number): Promise<ProductProductOut[]> {
    const odoo = new Odoo(odooConfig);
    const odooFilters2: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['id', 'like', productId]]],
    };
    const product = (await odoo.executeKW(odooFilters2)) as ProductProductOut[];
    return product;
  }
  async findOneProductByFilters(value: string): Promise<ProductProductOut[]> {
    let allProductsSearched: ProductProductOut[] = [];

    const odoo = new Odoo(odooConfig);
    const odooFilters: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['name', 'like', 'Acoustic']]],
      filters: {},
    };
    const productDefaultCode = (await odoo.executeKW(
      odooFilters,
    )) as ProductProductOut[];
    console.log(productDefaultCode);
    if (productDefaultCode.length > 0) {
      allProductsSearched = allProductsSearched.concat(productDefaultCode);
      console.log(allProductsSearched);
    }
    const odooFilters2: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['name', 'like', value]]],
    };
    const productName = (await odoo.executeKW(
      odooFilters2,
    )) as ProductProductOut[];
    if (productName.length > 0) {
      allProductsSearched = allProductsSearched.concat(productName);
      console.log(allProductsSearched);
    }
    const odooFilters3: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['default_code', 'ilike', value]]],
    };
    const productBarcode = (await odoo.executeKW(
      odooFilters3,
    )) as ProductProductOut[];
    if (productBarcode.length > 0) {
      allProductsSearched = allProductsSearched.concat(productBarcode);
      console.log(allProductsSearched);
    }
    return allProductsSearched;
  }
}
// , ['barcode', 'like', 5000]
