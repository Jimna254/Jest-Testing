import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";

export default class Connection {
  private pool: Promise<mssql.ConnectionPool>;

  constructor() {
    this.pool = this.getConnection();
  }

  getConnection(): Promise<mssql.ConnectionPool> {
    const pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;

    return pool;
  }

  createRequest(
    request: mssql.Request,
    data: { [c: string | number]: string | number }
  ) {
    const keys = Object.keys(data);

    keys.map((keyName) => {
      const keyValue = data[keyName];
      request.input(keyName, keyValue);
    });

    return request;
  }

  async execute(
    procedureName: string,
    data: { [c: string | number]: string | number } = {}
  ) {
    let pool = await this.pool;

    let request = (await pool.request()) as mssql.Request;

    request = this.createRequest(request, data);

    const result = await request.execute(procedureName);

    return result;
  }

  async query(query: string) {
    const result = (await this.pool).request().query(query);

    return result;
  }
}
