// import { Odoo } from './odoo';

// var odoo = new Odoo({
//   url: 'http://elmalecon.nkodexsoft.com',
//   port: '8069',
//   db: 'elmalecon',
//   username: 'administrator',
//   password: '123456'
// });
// odoo.connect(err => {
//   if (err) { return console.log(err); }
//   console.log('Connected to Odoo server.');
// });

// import * as xmlrpc from 'xmlrpc';

// const odoo = xmlrpc.createClient({
//   port: 8069,
//   path: '/xmlrpc/2/common',
//   basic_auth: { user: 'administrador', pass: '123456' },
//   host: 'elmalecon.nkodexsoft.com'
// });
// odoo.methodCall('version', null, (err, value) => {
//   console.log(err);
//   console.log(value);
// });

// odoo.methodCall('authenticate', ['elmalecon', 'administrador', '123456', []], (err, value) => {
//   console.log(err);
//   console.log(value);
// });

// odoo.methodCall('execute_kw', ['elmalecon', 1, '123456','res.partner', 'search', ['is_company', '=', true], ["customer", "=", true]], (err, value) => {
//   console.log(err);
//   console.log(value);
// });

// const odooModels = xmlrpc.createClient({
//   port: 8069,
//   path: '/xmlrpc/2/object',
//   basic_auth: { user: 'administrador', pass: '123456' },
//   host: 'elmalecon.nkodexsoft.com'
// });

// odooModels.methodCall(
//   'execute_kw',
//   ['elmalecon', '1', '123456', 'res.partner', 'check_access_rights', ['read']],
//   (err, value) => {
//     if (!err) {
//       console.log(value);
//     }
//   }
// );

// odooModels.methodCall(
//   'execute_kw',
//   [
//     'elmalecon',
//     '1',
//     '123456',
//     'res.partner',
//     'search',
//     [[['is_company', '=', false], ['customer', '=', true]]],
//     { offset: 10, limit: 5 }
//   ],
//   (err, value) => {
//     if (!err) {
//       console.log(value);
//     }
//   }
// );

import { Odoo, OdooParams, OdooFilters } from './odoo';

const odooParams: OdooParams = {
  uid: 1,
  db: 'elmalecon',
  odooUrl: 'http://elmalecon.nkodexsoft.com:8069',
  username: 'administrador',
  password: '123456'
};

let odooFilters: OdooFilters = {
  model: 'stock.inventory',
  method: 'search_read',
  params: []
};
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
const odoo = new Odoo(odooParams);
// odoo
//   .authenticate()
//   .then(value => {
//     // console.log(value);
//   })
//   .catch(err => {
//     console.log(err);
//   });
odoo
  .executeKW(odooFilters)
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.log(err);
  });
