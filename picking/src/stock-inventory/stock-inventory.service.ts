import { Injectable, Controller } from '@nestjs/common';
import { OdooParams, OdooFilters, Odoo } from '../../../odoo';
import { odooConfig } from './../shared/config/odoo-config';

@Injectable()
@Controller('')
export class StockInventoryService {
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
      params: [[['inventory_id', '=', inventoryId]]],
      filters: {},
    };
    const odoo = new Odoo(odooConfig);
    return await odoo.executeKW(odooFilters);
  }
}
