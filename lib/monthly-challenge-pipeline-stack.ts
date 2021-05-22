import * as cdk from '@aws-cdk/core'
import * as pipeline from '@aws-cdk/aws-codepipeline'
import * as codepipelineaction from '@aws-cdk/aws-codepipeline-actions'
import { CodeCommitTrigger } from '@aws-cdk/aws-codepipeline-actions'
import * as codecommit from '@aws-cdk/aws-codecommit'
import * as codebuild from '@aws-cdk/aws-codebuild'

export class MonthlyChallengePipelineStack extends cdk.Stack {
    constructor(scope?: cdk.Construct, id?: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const artifact1 = new pipeline.Artifact()
        const artifact2 = new pipeline.Artifact()

        const my_pipeline = new pipeline.Pipeline(this, 'monthlyChallengePipeline', {
            pipelineName: 'monthlyChallengePipeline'
        })

        my_pipeline.addStage({
            stageName: 'checkout',
            actions: [
                new codepipelineaction.CodeCommitSourceAction({
                    branch: 'main',
                    trigger: CodeCommitTrigger.POLL,
                    output: artifact1,
                    actionName: 'sourceCheckout',
                    repository: codecommit.Repository.fromRepositoryName(this, 'monthyChallengeId', 'monthly_challenge')
                })
            ]
        })

        my_pipeline.addStage({
            stageName: 'build',
            actions: [
                new codepipelineaction.CodeBuildAction({
                    input: artifact1,
                    outputs: [artifact2],
                    project: new codebuild.PipelineProject(this, 'monthlychallengebuild_project', {
                        projectName: 'monthlychallengebuild_project',
                        //buildSpec: codebuild.BuildSpec.fromSourceFilename('./buildspec.yml')
                    }),
                    actionName: 'repositoryBreuild'
                })
            ]
        })

    }
}