import { Stage, StageProps } from "aws-cdk-lib";

import { AwsCdkWorkshopShivangiCheckStack } from "./aws-cdk-workshop-shivangi-check-stack";
import { Construct } from "constructs";

export class WorkshopPipelineStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new AwsCdkWorkshopShivangiCheckStack(this, "WebServiceSACheck");
  }
}
