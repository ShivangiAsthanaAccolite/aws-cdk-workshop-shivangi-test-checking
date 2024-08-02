#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";

// import { WorkshopPipelineStack } from "../lib/pipeline-stack";
import { AwsCdkWorkshopShivangiCheckStack } from "../lib/aws-cdk-workshop-shivangi-check-stack";

const app = new cdk.App();
// new WorkshopPipelineStack(app, "CdkWorkshopPipelineStackSACheck");

new AwsCdkWorkshopShivangiCheckStack(app, "AwsCdkWorkshopShivangiCheckStack", {
  env: {
    account: process.env.account,
    region: process.env.region,
  },
});

// new WorkshopPipelineStack(app, "CdkWorkshopPipelineStackSACheck", {
//   env: {
//     account: process.env.account,
//     region: process.env.region,
//   },
// });
