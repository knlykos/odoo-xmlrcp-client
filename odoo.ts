import * as xmlrpc from 'xmlrpc';
import * as url from 'url';
interface ClientOptions {
  host?: string;
  path?: string;
  port?: number;
  url?: string;
  cookies?: boolean;
  headers?: { [header: string]: string };
  basic_auth?: { user: string; pass: string };
  method?: string;
}

export interface OdooParams {
  uid?: string;
  odooUrl: string;
  db: string;
  username: string;
  password: string;
}

export class Odoo {
  clientOptions: ClientOptions;
  db: string;
  uid: string;
  user: string;
  pass: string;
  clientCommun: xmlrpc.Client;
  clientObject: xmlrpc.Client;
  isSecure: boolean = false;

  constructor(odooParams: OdooParams) {
    const urlParsed = url.parse(odooParams.odooUrl);
    if (urlParsed.protocol === 'https:') {
      this.isSecure = false;
    }
    this.uid = odooParams.uid;
    this.db = odooParams.db;
    this.user = odooParams.username;
    this.pass = odooParams.password;
    this.clientOptions = {
      port: Number(urlParsed.port),
      host: urlParsed.hostname,
      basic_auth: { user: odooParams.username, pass: odooParams.password }
    };
  }

  async authenticate() {
    if (this.isSecure) {
      this.clientOptions.path = '/xmlrpc/2/common';
      this.clientCommun = xmlrpc.createSecureClient(this.clientOptions);
      // this.clientOptions.path = '/xmlrpc/2/object';
      // this.clientObject = xmlrpc.createSecureClient(this.clientOptions);
    } else {
      this.clientOptions.path = '/xmlrpc/2/common';
      this.clientCommun = xmlrpc.createClient(this.clientOptions);
      // this.clientOptions.path = '/xmlrpc/2/object';
      // this.clientObject = xmlrpc.createClient(this.clientOptions);
    }
    return new Promise((resolve, reject) => {
      this.clientCommun.methodCall(
        'authenticate',
        [this.db, this.user, this.pass, []],
        (err, value) => {
          if (!err) {
            this.uid = value;
            resolve(this.uid);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  objectConn() {
    if (this.isSecure) {
      this.clientOptions.path = '/xmlrpc/2/object';
      this.clientObject = xmlrpc.createSecureClient(this.clientOptions);
    } else {
      this.clientOptions.path = '/xmlrpc/2/object';
      this.clientObject = xmlrpc.createClient(this.clientOptions);
    }
  }

  async executeKW(inputParams: OdooFilters): Promise<any[]> {
    this.objectConn();
    const params: Array<any> = [this.db, String(this.uid), this.pass];
    params.push(inputParams.model);
    params.push(inputParams.method);
    params.push(inputParams.params);
    params.push(inputParams.filters);
    console.log(JSON.stringify(params));
    return new Promise((resolve, reject) => {
      this.clientObject.methodCall('execute_kw', params, (err, value) => {
        if (!err) {
          console.log(err);
          resolve(value);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  }
}

export interface OdooFilters {
  model: string;
  method: string;
  params: any;
  filters?: Object;
}

// model, method, params, callback
