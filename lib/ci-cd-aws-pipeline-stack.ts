import * as cdk from 'aws-cdk-lib';
import { CodePipelineSource, ShellStep, CodePipeline } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CiCdAwsPipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub('prasannac-cuelogic/ci-cd-aws-pipeline', 'master'),
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      }),
    });
  }
}
