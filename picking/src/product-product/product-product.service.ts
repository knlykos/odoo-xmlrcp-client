import { Injectable } from '@nestjs/common';
import { OdooParams, OdooFilters, Odoo } from '../../../odoo';
import { odooConfig } from './../shared/config/odoo-config';
import { ProductProductOut } from 'src/shared/models/product-product.models';
@Injectable()
export class ProductProductService {
//   async findOneProductProduct(productId: number): Promise<ProductProductOut[]> {
//     const odoo = new Odoo(odooConfig);
//     const odooFilters2: OdooFilters = {
//       model: 'product.product',
//       method: 'search_read',
//       params: [[['id', '=', productId]]],
//     };
//     const product = (await odoo.executeKW(odooFilters2)) as ProductProductOut[];
//     return product;
//   }
}
