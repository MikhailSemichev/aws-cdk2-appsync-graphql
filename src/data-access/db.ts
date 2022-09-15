import { Pool, Client } from 'pg';
import { getDBCredentials } from './config';

let pool: Promise<Pool>;
export async function getDbPool(): Promise<Pool> {
  if (!pool) {
    const dbCredentials = await getDBCredentials();
    pool = Promise.resolve(
      new Pool({
        host: dbCredentials.host,
        port: dbCredentials.port,
        database: 'ecom_db',
        user: dbCredentials.username,
        password: dbCredentials.password,
      }),
    );
  }
  return pool;
}
