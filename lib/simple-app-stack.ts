import * as cdk from '@aws-cdk/core';
import * as codepipeline_action from '@aws-cdk/aws-codepipeline-actions'
import { Repository } from '@aws-cdk/aws-codecommit'
import * as codepipeline from '@aws-cdk/aws-codepipeline'
import { CdkPipeline, CdkStage, SimpleSynthAction } from '@aws-cdk/pipelines';
import { Stage } from '@aws-cdk/core';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { CodeBuildAction, CodeBuildActionType } from '@aws-cdk/aws-codepipeline-actions';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

// THIS IS EXPERIMENTAL
// DO NOT DEPLOY THIS STACK
export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    
    super(scope, id, props);

    // The code that defines your stack goes here

    const artifact = new codepipeline.Artifact()

    // The repo for which the pipeline is created
    const repository = new Repository(this, 'monthly_challenge_repo', { repositoryName: "monthly_challenge" })

    //The action for which the pipeline will be executed
    const source_actions = new codepipeline_action.CodeCommitSourceAction({
      repository: repository,
      output: artifact,
      branch: 'main',
      actionName: 'monthly_challenges_action'
    })

    const synth_action2 = new SimpleSynthAction({
      buildCommands: ['pwd'],
      synthCommand: 'pwd',
      sourceArtifact: new codepipeline.Artifact(),
      cloudAssemblyArtifact: new codepipeline.Artifact()
    });

    //new codepipeline_action.CodeBuildAction()

    const source_output = new codepipeline.Artifact()
    const commit_action = new codepipeline_action.CodeCommitSourceAction({
      actionName: 'commit',
      repository: repository,
      output: source_output,
      branch: 'main'
    })

    const project = new PipelineProject(this, 'MyProject')
    const test_output = new codepipeline.Artifact()
    const test_action = new codepipeline_action.CodeBuildAction({
      actionName: 'test',
      project,
      input: source_output,
      outputs: [test_output],
      type: CodeBuildActionType.TEST
    })

    const build_output = new codepipeline.Artifact()
    const build_action = new codepipeline_action.CodeBuildAction({
      actionName: 'build',
      project,
      input: test_output,
      outputs: [build_output]
    })

    const codePipeline: Pipeline = new codepipeline.Pipeline(this, 'codepipeline', {
      stages: [
        {
          stageName: 'source',
          actions: [
            //synth_action1
            commit_action
            //my_action
          ]
        },
        {
          stageName: 'test',
          actions: [
            //synth_action2
            test_action
          ]
        },
        {
          stageName: 'build',
          actions: [
            //synth_action2
            build_action
          ]
        }
      ]
    })

    const cdkPipeline = new CdkPipeline(this, 'CdkPipeline', {
      //sourceAction: source_actions,
      //synthAction: synth_action2,
      codePipeline,
      cloudAssemblyArtifact: build_output
    });

  }
}
