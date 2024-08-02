#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";

import { WorkshopPipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();
// new WorkshopPipelineStack(app, "CdkWorkshopPipelineStackSACheck");

new WorkshopPipelineStack(app, "CdkWorkshopPipelineStackSACheck", {
  env: {
    account: process.env.account,
    region: process.env.region,
  },
});
