import * as cdk from "aws-cdk-lib";
import * as codecommit from "aws-cdk-lib/aws-codecommit";

import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";

import { Construct } from "constructs";
import { WorkshopPipelineStage } from "./pipeline-stage";

export class WorkshopPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates a CodeCommit repository called 'WorkshopRepoShivangi'
    const repo = new codecommit.Repository(this, "WorkshopRepoSACheck", {
      repositoryName: "WorkshopRepoSACheck",
    });

    // The basic pipeline declaration. This sets the initial structure
    // of our pipeline
    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "WorkshopPipelineSACheck",
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.codeCommit(repo, "main"),
        installCommands: ["npm install -g aws-cdk"],
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    // Pipeline code goes here

    const deploy = new WorkshopPipelineStage(this, "Deploy");
    const deployStage = pipeline.addStage(deploy);

    deployStage.addPost(
      new CodeBuildStep("TestViewerEndpoint", {
        projectName: "TestViewerEndpoint",
        envFromCfnOutputs: {
          ENDPOINT_URL: deploy.hcViewerUrl,
        },
        commands: ["curl -Ssf $ENDPOINT_URL"],
      }),

      new CodeBuildStep("TestAPIGatewayEndpoint", {
        projectName: "TestAPIGatewayEndpoint",
        envFromCfnOutputs: {
          ENDPOINT_URL: deploy.hcEndpoint,
        },
        commands: [
          "curl -Ssf $ENDPOINT_URL",
          "curl -Ssf $ENDPOINT_URL/hello",
          "curl -Ssf $ENDPOINT_URL/test",
        ],
      })
    );
  }
}
