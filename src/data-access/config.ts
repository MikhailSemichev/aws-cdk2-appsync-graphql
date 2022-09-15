import { DB_CREDANTIALS_ARN } from '../environment';
import { DBCredetials } from './dbCredentials';
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({});

let dbCredentials: Promise<DBCredetials>;
export async function getDBCredentials(): Promise<DBCredetials> {
  if (!dbCredentials) {
    const command = new GetSecretValueCommand({
      SecretId: DB_CREDANTIALS_ARN,
    });
    const response = await client.send(command);
    dbCredentials = JSON.parse(response.SecretString || '');
  }
  return await dbCredentials;
}
