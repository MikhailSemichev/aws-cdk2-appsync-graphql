import * as db from '../../db';
import { ClientDbType } from './ClientDbType';

export async function getClients(): Promise<ClientDbType[]> {
  const pool = await db.getDbPool();
  const result = await pool.query<ClientDbType>('SELECT * FROM clients');
  console.log('SQL query result', result);

  return result.rows;
}

export async function getClient(clientId: string): Promise<ClientDbType> {
  const pool = await db.getDbPool();
  const result = await pool.query<ClientDbType>('SELECT * FROM clients WHERE id = $1', [clientId]);
  console.log('SQL query result', result);

  return result.rows[0];
}

export async function createClient(client: ClientDbType): Promise<ClientDbType> {
  const pool = await db.getDbPool();

  const result = await pool.query<ClientDbType>(
    'INSERT INTO clients (id, full_name, email, phone, home_address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [client.id, client.full_name, client.email, client.phone, client.home_address],
  );
  console.log('SQL query result', result);

  return result.rows[0];
}

export async function updateClient(client: ClientDbType): Promise<ClientDbType> {
  const pool = await db.getDbPool();

  const result = await pool.query<ClientDbType>(
    'UPDATE clients SET full_name=$1, email=$2, phone=$3, home_address=$4 WHERE id = $5 RETURNING *',
    [client.full_name, client.email, client.phone, client.home_address, client.id],
  );
  console.log('SQL query result', result);

  return result.rows[0];
}
