import * as cdk from "aws-cdk-lib";
import * as codecommit from "aws-cdk-lib/aws-codecommit";

import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";

import { Construct } from "constructs";

export class WorkshopPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates a CodeCommit repository called 'WorkshopRepoShivangi'
    const repo = new codecommit.Repository(this, "WorkshopRepoSACheck", {
      repositoryName: "WorkshopRepoSACheck",
    });

    // Pipeline code goes here
  }
}
