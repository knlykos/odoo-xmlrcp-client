export interface StockInventoryOut {
  product_id?: Array<number | string> | boolean;
  date?: Date;
  create_uid?: Array<number | string>;
  location_id?: Array<number | string>;
  id?: number;
  filter?: string;
  line_ids?: number[];
  company_id?: Array<number | string>;
  category_id?: boolean;
  create_date?: Date;
  partner_id?: boolean;
  write_uid?: Array<number | string>;
  exhausted?: boolean;
  lot_id?: boolean;
  name?: string;
  move_ids?: number[];
  write_date?: Date;
  display_name?: string;
  __last_update?: Date;
  state?: string;
  total_qty?: number;
  package_id?: boolean;
}
