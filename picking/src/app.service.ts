import { Injectable } from '@nestjs/common';
import { Odoo, OdooParams, OdooFilters } from './../../odoo';

@Injectable()
export class AppService {
  async getHello(): Promise<any[]> {
    let data = [];
    const odooParams: OdooParams = {
      uid: '1',
      db: 'elmalecon',
      odooUrl: 'http://elmalecon.nkodexsoft.com:8069',
      username: 'administrador',
      password: '123456',
    };
    const odooFilters: OdooFilters = {
      model: 'product.product',
      method: 'search_read',
      params: [[['name', 'like', 'PAQ']]],
      filters: { fields: ['name'], limit: 100 },
    };
    const odoo = new Odoo(odooParams);
    return await odoo.executeKW(odooFilters);
  }
}
