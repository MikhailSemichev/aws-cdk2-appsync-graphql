import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda';
// import {
//   MessageQueryFarewellMessageArgs,
//   MessageQueryWelcomeMessageArgs,
// } from '../generated/resolvers-types';
import { Header } from './header';

// type QueryArgs = MessageQueryArgs;
// type MessageQueryArgs = MessageQueryWelcomeMessageArgs | MessageQueryFarewellMessageArgs;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//export const getHeader: AppSyncResolverHandler<QueryArgs, Header> = async (event) => {

export const getHeader: AppSyncResolverHandler<unknown, Header> = async (event, context) => {
  const header: Header = {
    logoUrl: 'www.google.com/url',
    menu: ['category1', 'category2', 'category3'],
  };

  return header;
};
