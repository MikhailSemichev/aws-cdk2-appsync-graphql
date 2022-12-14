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

type GetHeaderInput = { authorized: boolean };

export const getHeader: AppSyncResolverHandler<GetHeaderInput, Header> = async (event, context) => {
  const header: Header = {
    logoUrl: 'www.google.com/url',
    menu: ['category1', 'category2', 'category3'],
  };

  if (event.arguments.authorized) {
    header.menu = ['VIP', ...header.menu];
  }

  return header;
};
