import { Injectable, Controller } from '@nestjs/common';
import { OdooParams, OdooFilters, Odoo } from '../../../odoo';
import { odooConfig } from './../shared/config/odoo-config';
import { StockInventoryLineOut } from 'src/shared/models/stock-inventory-line.models';
import { ProductProductOut } from 'src/shared/models/product-product.models';
import { StockInventoryOut } from 'src/shared/models/stock-inventory.model';

@Injectable()
export class StockInventoryService {
  odoo: Odoo = new Odoo(odooConfig);

  stockInventoryLine: StockInventoryLineOut[] = [];
  async findAll(offsetParam: number, limitParam: number) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory',
      method: 'search_read',
      params: [],
      filters: { offset: offsetParam, limit: limitParam },
    };

    return await this.odoo.executeKW(odooFilters);
  }

  async findAllDetails(inventoryId: number): Promise<any[]> {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory.line',
      method: 'search_read',
      params: [[['inventory_id', '=', 1]]],
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
  async findOneProductByFilters(value: string): Promise<ProductProductOut[]> {
    let allProductsSearched: ProductProductOut[] = [];

    const odooFilters: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['name', 'like', 'Acoustic']]],
      filters: {},
    };
    const productDefaultCode = (await this.odoo.executeKW(
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
    const productName = (await this.odoo.executeKW(
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
    const productBarcode = (await this.odoo.executeKW(
      odooFilters3,
    )) as ProductProductOut[];
    if (productBarcode.length > 0) {
      allProductsSearched = allProductsSearched.concat(productBarcode);
      console.log(allProductsSearched);
    }
    return allProductsSearched;
  }

  createInventoryStock(stockInventory: StockInventoryOut) {
    const odooFilters: OdooFilters = {
      model: 'stock.inventory',
      method: 'create',
      params: [
        {
          name: 'Annual Inventory',
          filter: 'partial',
        },
      ],
    };
    const id = this.odoo.executeKW(odooFilters);
    return id;
  }
}
// , ['barcode', 'like', 5000]
