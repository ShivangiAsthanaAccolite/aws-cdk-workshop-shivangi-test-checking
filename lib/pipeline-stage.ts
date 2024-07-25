import { CfnOutput, Stage, StageProps } from "aws-cdk-lib";

import { AwsCdkWorkshopShivangiCheckStack } from "./aws-cdk-workshop-shivangi-check-stack";
import { Construct } from "constructs";

export class WorkshopPipelineStage extends Stage {
  public readonly hcViewerUrl: CfnOutput;
  public readonly hcEndpoint: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new AwsCdkWorkshopShivangiCheckStack(
      this,
      "WebServiceSACheck"
    );

    this.hcEndpoint = service.hcEndpoint;
    this.hcViewerUrl = service.hcViewerUrl;
  }
}
