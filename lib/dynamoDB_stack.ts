import * as cdk from '@aws-cdk/core'
import * as db from '@aws-cdk/aws-dynamodb'
import * as iam from '@aws-cdk/aws-iam'
import { AttributeType } from '@aws-cdk/aws-dynamodb'

export class DynamoDBStack extends cdk.Stack {
    constructor(scope?: cdk.Construct, id?:string, props?:cdk.StackProps) {
        super(scope, id, props)

        // To get an existing table
        //const mytable = db.Table.fromTableName(this, '', '')

        const my_table = new db.Table(this, 'stackTable', {
            tableName: 'stackTable',
            partitionKey: {
                name: 'id', type: AttributeType.NUMBER
            }
        })

        const user = iam.User.fromUserName(this, 'admin_user', 'AWSLearner_admin')
        
        // Another way of granting access
        //user.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'))
        
        //my_table.grantReadWriteData(user)
        
    }
}