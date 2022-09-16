import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda';
import { HomePage } from './homePage';
import * as cs from 'contentstack';

// Initialize the Contentstack Stack
const CS_API_KEY = process.env.CS_API_KEY || 'blt0619d4d4d9959be5';
const CS_DELIVERY_TOKEN = process.env.CS_API_KEY || 'csda4a97f7107c3d0476a31a20';
const CS_ENVIRONMENT = process.env.CS_ENVIRONMENT || 'ms-test';
const Stack = cs.Stack(CS_API_KEY, CS_DELIVERY_TOKEN, CS_ENVIRONMENT);

export const getHomePage: AppSyncResolverHandler<unknown, HomePage> = async (event, context) => {
  const header: HomePage = {
    title: 'Calvin Home',
    image: '/img1.png',
  };

  const Query = Stack.ContentType('ms_webpage').Entry('blte47750c9395a38e5');
  const entry = await Query.fetch();

  header.image = entry.get('image') || 'empty';
  header.title = entry.get('title');

  return header;
};
