import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketVersioningA } from "@cdktf/provider-aws/lib/s3-bucket-versioning";


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const bucket = new S3Bucket(this, "bucket", {});

    new S3BucketVersioningA(this, "versioning", {
      bucket: bucket.id,
      versioningConfiguration: {
        status: "Enabled",
      }
    })
  }
}

const app = new App();
new MyStack(app, "config-driven-import");
app.synth();