import { Injectable, Controller } from '@nestjs/common';
import { OdooParams, OdooFilters, Odoo } from '../../../odoo';
import { odooConfig } from './../shared/config/odoo-config';
import { StockInventoryLineOut } from 'src/shared/models/stock-inventory-line.models';
import { ProductProductOut } from 'src/shared/models/product-product.models';
import { StockInventoryOut } from 'src/shared/models/stock-inventory.model';

@Injectable()
export class StockInventoryService {
  odoo: Odoo = new Odoo(odooConfig);
  odooFilters: OdooFilters;

  stockInventoryLine: StockInventoryLineOut[] = [];
  async findAll(offsetParam: number, limitParam: number) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory',
      method: 'search_read',
      params: [[['state', '=', 'confirm']]],
      filters: { offset: offsetParam, limit: limitParam },
    };

    return await this.odoo.executeKW(odooFilters);
  }

  async findAllByIdStockInventory(id: number) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory',
      method: 'search_read',
      params: [[['id', '=', Number(id)]]],
    };

    return await this.odoo.executeKW(odooFilters);
  }

  async findAllDetails(inventoryId: number): Promise<any[]> {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory.line',
      method: 'search_read',
      params: [[['inventory_id', '=', inventoryId]]],
      filters: {},
    };

    this.stockInventoryLine = (await this.odoo.executeKW(
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
    const odooFilters2: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['id', 'like', productId]]],
    };
    const product = (await this.odoo.executeKW(
      odooFilters2,
    )) as ProductProductOut[];
    return product;
  }

  async findOneProductByBarcode(barcode: string): Promise<ProductProductOut[]> {
    const odooFilters: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['barcode', '=', barcode]]],
    };
    const product = (await this.odoo.executeKW(
      odooFilters,
    )) as ProductProductOut[];
    return product;
  }
  async findOneProductByFilters(value: string): Promise<ProductProductOut[]> {
    let allProductsSearched: ProductProductOut[] = [];

    const odooFilters: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['name', 'ilike', value]]],
      filters: {},
    };
    const productDefaultCode = (await this.odoo.executeKW(
      odooFilters,
    )) as ProductProductOut[];
    // tslint:disable-next-line: no-console
    console.log(productDefaultCode);
    if (productDefaultCode.length > 0) {
      allProductsSearched = allProductsSearched.concat(productDefaultCode);
      // tslint:disable-next-line: no-console
      console.log(allProductsSearched);
    }
    const odooFilters2: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['default_code', 'ilike', value]]],
    };
    const productName = (await this.odoo.executeKW(
      odooFilters2,
    )) as ProductProductOut[];
    if (productName.length > 0) {
      allProductsSearched = allProductsSearched.concat(productName);
      // tslint:disable-next-line: no-console
      console.log(allProductsSearched);
    }
    const odooFilters3: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['barcode', 'ilike', value]]],
    };
    const productBarcode = (await this.odoo.executeKW(
      odooFilters3,
    )) as ProductProductOut[];
    if (productBarcode.length > 0) {
      allProductsSearched = allProductsSearched.concat(productBarcode);
      // tslint:disable-next-line: no-console
      console.log(allProductsSearched);
    }
    return allProductsSearched;
  }

  async createInventoryStock(stockInventory: StockInventoryOut) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory',
      method: 'create',
      params: [stockInventory],
    };
    // tslint:disable-next-line: no-console
    console.log(odooFilters);
    const id = await this.odoo.executeKW(odooFilters);
    return id;
  }

  async createStockInventoryDetail(stockInventoryLine: StockInventoryLineOut) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory.line',
      method: 'create',
      params: [stockInventoryLine],
    };

    return this.odoo.executeKW(odooFilters);
  }

  async updateStockInventoryDetail(stockInventoryLine: StockInventoryLineOut) {
    const id2Update = stockInventoryLine.id;

    this.odooFilters = {
      model: 'stock.inventory.line',
      method: 'write',
      params: [stockInventoryLine.id, stockInventoryLine],
    };

    await this.odoo.executeKW(this.odooFilters);

    this.odooFilters = {
      model: 'stock.inventory.line',
      method: 'name_get',
      params: [[stockInventoryLine.id]],
    };
    return await this.odoo.executeKW(this.odooFilters);
  }
}
// , ['barcode', 'like', 5000]
