import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as path from 'path';
import * as fs from 'fs';

import { Construct } from 'constructs';

const STAGE_NAME = process.env.STAGE || 'prod';

export class MiddlewareStack extends cdk.Stack {
  api: appsync.CfnGraphQLApi;
  apiKey: appsync.CfnApiKey;
  schema: appsync.CfnGraphQLSchema;
  invokeLambdaRole: iam.Role;

  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    this.api = new appsync.CfnGraphQLApi(this, 'api', {
      name: 'middleware-api',
      authenticationType: 'API_KEY',
      // TODO: consider
      xrayEnabled: false,
    });

    this.apiKey = new appsync.CfnApiKey(this, 'apiKey', {
      apiId: this.api.attrApiId,
      // the properties below are optional
      apiKeyId: 'apiKeyId',
      description: 'description',
    });

    this.schema = new appsync.CfnGraphQLSchema(this, 'middleware-api-schema', {
      apiId: this.api.attrApiId,
      definition: fs.readFileSync(path.join(__dirname, '../graphql/schema.graphql')).toString(),
    });

    this.invokeLambdaRole = new iam.Role(this, 'middleware-appsync-InvokeLambdaRole', {
      assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
    });

    this.addResolver('Query', 'getHeader', '../src/lambdas/header/getHeader.lambda.ts');

    this.addResolver('Query', 'getFooter', '../src/lambdas/footer/getFooter.lambda.ts');

    this.addResolver('Query', 'getHomePage', '../src/lambdas/homePage/getHomePage.lambda.ts');

    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: this.api.attrGraphQlUrl,
    });

    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: this.apiKey.attrApiKey || '',
    });
  }

  addResolver(typeName: string, fieldName: string, functionPath: string) {
    const lambdaName = `${typeName}_${fieldName}`;
    const lambdaFunction = new NodejsFunction(this, lambdaName, {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, functionPath),
      handler: fieldName,
      functionName: lambdaName,
    });

    const dataSource = new appsync.CfnDataSource(this, `${lambdaName}_DataSource`, {
      apiId: this.api.attrApiId,
      name: `${lambdaName}_DataSource`,
      type: 'AWS_LAMBDA',
      lambdaConfig: {
        lambdaFunctionArn: lambdaFunction.functionArn,
      },
      serviceRoleArn: this.invokeLambdaRole.roleArn,
    });

    const resolver = new appsync.CfnResolver(this, `${lambdaName}_Resolver`, {
      apiId: this.api.attrApiId,
      typeName,
      fieldName,
      dataSourceName: dataSource.name,
    });

    // Ensures that the resolvers are created after the schema.
    resolver.addDependsOn(this.schema);
    resolver.addDependsOn(dataSource);

    // Ensures that AppSync is able to invoke the lambda function.
    this.invokeLambdaRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [lambdaFunction.functionArn],
        actions: ['lambda:InvokeFunction'],
      }),
    );
  }
}
