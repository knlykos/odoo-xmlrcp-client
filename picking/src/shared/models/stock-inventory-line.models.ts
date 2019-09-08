import { ProductProductOut } from './product-product.models';

export interface StockInventoryLineOut {
  product_id?: Array<number | string>;
  products?: ProductProductOut[];
  prod_lot_id?: boolean;
  create_uid?: Array<string | number>;
  write_date?: Date;
  state?: string;
  location_id?: Array<string | number>;
  theoretical_qty?: number;
  id?: number;
  __last_update?: Date;
  inventory_location_id?: Array<string | number>;
  company_id?: Array<string | number>;
  product_uom_id?: Array<string | number>;
  product_tracking?: string;
  display_name?: string;
  product_uom_category_id?: Array<string | number>;
  create_date?: Date;
  product_qty?: number;
  partner_id?: boolean;
  write_uid?: Array<string | number>;
  inventory_id?: Array<string | number>;
  package_id?: boolean;
}
