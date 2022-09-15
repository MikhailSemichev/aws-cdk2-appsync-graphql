import { APIGatewayEvent, Context } from 'aws-lambda';
import { getHeader } from './src/lambdas/header/getHeader.lambda';

console.log('start!');
/*getHeader(
  {
  } as unknown as AppSyncResolverEvent<unknown, Record<string, any> | null>,
  {} as Context,
)
  .then((response) => {
    console.log(JSON.stringify(response, null, 2));
    return response;
  })
  .catch((err: unknown) => console.error(err));
*/
