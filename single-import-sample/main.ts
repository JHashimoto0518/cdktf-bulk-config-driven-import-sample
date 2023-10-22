import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    new S3Bucket(this, "bucket", {}).importFrom("test-cdktf-import-20231022");
  }
}

const app = new App();
new MyStack(app, "config-driven-import");
app.synth();