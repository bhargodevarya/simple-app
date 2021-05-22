#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SimpleAppStack } from '../lib/simple-app-stack';
import { Ec2SampleStack } from '../lib/ec2-sample-stack';
import { MonthlyChallengeRepoStack } from '../lib/monthly_challenge_repo_stack';
import { MonthlyChallengePipelineStack } from '../lib/monthly-challenge-pipeline-stack';
import { DynamoDBStack } from '../lib/dynamoDB_stack';

const app = new cdk.App();
//new SimpleAppStack(app, 'SimpleAppStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
//});


// Creating a simple EC2 instance
// new Ec2SampleStack(app, 'ec2AppStack', {
//   env: {region: 'us-east-1', account: '519731107059'}
// })

// Creating the monthly_challenge repository
// new MonthlyChallengeRepoStack(app, 'monthlyChallengeRepoStack', {
//   env: {region: 'us-east-1', account: '519731107059'}
// })

// new MonthlyChallengePipelineStack(app, 'monthlyChallengePipelineStack', {
//   env: {region: 'us-east-1', account: '519731107059'}
// })

new DynamoDBStack(app, 'monthlyChallengePipelineStack', {
  env: {region: 'us-east-1', account: '519731107059'}
})

app.synth()
