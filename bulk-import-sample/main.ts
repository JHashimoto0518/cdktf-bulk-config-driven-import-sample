import { Construct } from "constructs";
import {
  App,
  TerraformStack,
} from "cdktf";

import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    new S3Buckets(
      this,
      "bucket",
      ["cdktf-test-web-20231024", "cdktf-test-log-20231024"]
    );
  }
}

// S3バケット
class S3Buckets extends Construct {
  constructor(scope: Construct, id: string, bucketNames: string[]) {
    super(scope, id);

    // すべてのバケット
    bucketNames.forEach((name) => {
      new S3Bucket(this, name, {}).importFrom(name);
    });
  }
}

const app = new App();
new MyStack(app, "config-driven-import");
app.synth();
