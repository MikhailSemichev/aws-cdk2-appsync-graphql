import { ClientDto, InputClientDto } from '../../lambdas/clients/ClientDto';
import * as clientsRepository from '../../data-access/repositories/clients/clientsRepository';
import { ClientDbType } from '../../data-access/repositories/clients/ClientDbType';
import { v4 as uuidv4 } from 'uuid';

export async function getClients(): Promise<ClientDto[]> {
  const clients = await clientsRepository.getClients();
  const clientsDto = clients.map(
    (cl) => new ClientDto(cl.id, cl.full_name, cl.email, cl.phone, cl.home_address),
  );

  return clientsDto;
}

export async function getClient(clientId: string): Promise<ClientDto | null> {
  const client = await clientsRepository.getClient(clientId);
  const clientDto = client
    ? new ClientDto(client.id, client.full_name, client.email, client.phone, client.home_address)
    : null;

  return clientDto;
}

export async function createClient(input: InputClientDto): Promise<ClientDto | null> {
  // validate
  validateClient(input);

  const clientDB: ClientDbType = {
    id: uuidv4(),
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    home_address: input.homeAddress,
  };

  const client = await clientsRepository.createClient(clientDB);

  const clientDto = client
    ? new ClientDto(client.id, client.full_name, client.email, client.phone, client.home_address)
    : null;
  return clientDto;
}

export async function updateClient(clientId: string, input: InputClientDto): Promise<ClientDto | null> {
  // validate
  validateClient(input);

  const clientDB: ClientDbType = {
    id: clientId,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    home_address: input.homeAddress,
  };

  const client = await clientsRepository.updateClient(clientDB);

  const clientDto = client
    ? new ClientDto(client.id, client.full_name, client.email, client.phone, client.home_address)
    : null;
  return clientDto;
}

function validateClient(input: InputClientDto) {
  if (!input.fullName || !input.email) {
    throw new Error("fullName and email can't be empty");
  }
}
