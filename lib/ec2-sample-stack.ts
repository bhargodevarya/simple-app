import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import { InstanceType } from '@aws-cdk/aws-ec2'

export class Ec2SampleStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const instance_type = InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)

        // Referring to the existing VPC
        // The stack must have the region and account details to work with the VPC resource.
        // It is added in the .ts file in the bin directory 
        const vpc = ec2.Vpc.fromLookup(this,'DefaultVpc', {vpcId: 'vpc-2333b95e', isDefault: true})

        const instance = new ec2.Instance(this, 'ec2', {
            instanceType: instance_type,
            instanceName: 'cdk_instance',
            vpc: vpc,
            machineImage: new ec2.AmazonLinuxImage({generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2})
        })
    }
}