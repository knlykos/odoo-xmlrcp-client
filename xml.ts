import * as xmlrpc from 'xmlrpc';
import * as url from 'url';

export interface Config {
  url?: string;
  port?: number;
  db?: string;
  username?: string;
  password?: string;
}

export class Odoo {
  private config: Config = {};
  private urlparts: url.UrlWithStringQuery;
  private host: string;
  private port: number;
  private db: string;
  private username: string;
  private password: string;
  private secure = true;
  constructor(config: Config) {
    this.config = config;
    this.urlparts = url.parse(this.config.url);
    this.host = this.urlparts.hostname;
    this.port = this.config.port || Number(this.urlparts.port);
    console.log(this.port);
    this.db = this.config.db;
    this.username = this.config.username;
    this.password = this.config.password;
    if (this.urlparts.protocol !== 'https:') {
      this.secure = false;
    }
    var uid = 0;
  }

  connect(callback) {
    var clientOptions = {
      host: this.host,
      port: this.port,
      path: '/xmlrpc/2/common'
    };

    let client: xmlrpc.Client;
    if (this.secure === false) {
      client = xmlrpc.createSecureClient(clientOptions);
    } else {
      client = xmlrpc.createSecureClient(clientOptions);
    }

    var params = [];
    params.push(this.db);
    params.push(this.username);
    params.push({});
    client.methodCall('authenticate', params, function(err, value) {
      if (err) {
        return callback;
      }
    });
  }
}
