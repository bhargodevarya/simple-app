import * as cdk from '@aws-cdk/core';
import * as codepipeline_action from '@aws-cdk/aws-codepipeline-actions'
import { Repository } from '@aws-cdk/aws-codecommit'
import * as codepipeline from '@aws-cdk/aws-codepipeline'
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';

export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const artifact = new codepipeline.Artifact()
    const cloud_artifact = new codepipeline.Artifact()

    // The repo for which the pipeline is created
    const repository = new Repository(this, 'monthly_challenge_repo', { repositoryName: "monthly_challenge" })

    //The action for which the pipeline will be executed
    const source_actions = new codepipeline_action.CodeCommitSourceAction({
      repository: repository,
      output: artifact,
      branch: 'main',
      actionName: 'monthly_challenges_action'
    })

    const pipeline = new CdkPipeline(this, 'monthly_challenge_pipeline', {
      sourceAction: source_actions,
      cloudAssemblyArtifact: cloud_artifact,
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact: artifact,
        cloudAssemblyArtifact: cloud_artifact,

        // Use this if you need a build step (if you're not using ts-node
        // or if you have TypeScript Lambdas that need to be compiled).
        buildCommand: 'npm run build',
      })
    });
  }
}
