import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda';
// import {
//   MessageQueryFarewellMessageArgs,
//   MessageQueryWelcomeMessageArgs,
// } from '../generated/resolvers-types';
import { Footer } from './footer';

// type QueryArgs = MessageQueryArgs;
// type MessageQueryArgs = MessageQueryWelcomeMessageArgs | MessageQueryFarewellMessageArgs;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//export const getHeader: AppSyncResolverHandler<QueryArgs, Header> = async (event) => {

export const getFooter: AppSyncResolverHandler<unknown, Footer> = async (event, context) => {
  const footer: Footer = {
    copyrightText: 'Copyright 2022',
    links: [
      { text: 'Link1', url: 'www.url1.com' },
      { text: 'Link2', url: 'www.url2.com' },
      { text: 'Link3', url: 'www.url1.com' },
      { text: 'Link4', url: 'www.url2.com' },
      { text: 'Link5', url: 'www.url1.com' },
      { text: 'Link6', url: 'www.url2.com' },
    ],
  };

  return footer;
};
