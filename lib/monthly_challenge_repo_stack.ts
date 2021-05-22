import * as cdk from '@aws-cdk/core'
import * as codecommit from '@aws-cdk/aws-codecommit'

export class MonthlyChallengeRepoStack extends cdk.Stack {
    constructor(scope?: cdk.Construct, id?: string, props?: cdk.StackProps) {
        super(scope, id, props)

        new codecommit.Repository(this, 'repo', {
            repositoryName: 'monthly_challenge',
            description: 'Django app',
        })
        

    }


}