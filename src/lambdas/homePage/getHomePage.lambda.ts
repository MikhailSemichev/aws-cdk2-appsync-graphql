import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda';
// import {
//   MessageQueryFarewellMessageArgs,
//   MessageQueryWelcomeMessageArgs,
// } from '../generated/resolvers-types';
import { HomePage } from './homePage';

// type QueryArgs = MessageQueryArgs;
// type MessageQueryArgs = MessageQueryWelcomeMessageArgs | MessageQueryFarewellMessageArgs;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//export const getHeader: AppSyncResolverHandler<QueryArgs, Header> = async (event) => {

export const getHomePage: AppSyncResolverHandler<unknown, HomePage> = async (event, context) => {
  const header: HomePage = {
    title: 'Calvin Home',
    image: '/img1.png',
  };

  return header;
};
