import { Construct } from "constructs";
import { App, TerraformIterator, TerraformStack, TerraformVariable, VariableType } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const bucketNames = new TerraformVariable(this, "bucket_names", {
      type: VariableType.list(VariableType.STRING),
      default: ["cdktf-test-web-20231024", "cdktf-test-log-20231024"],
    });

    const simpleIterator = TerraformIterator.fromList(bucketNames.listValue);

    // すべてのバケットに対してインポートを実行
    new S3Bucket(this, "bucket", {
      forEach: simpleIterator,
    }).importFrom(simpleIterator.value);
  }
}

const app = new App();
new MyStack(app, "config-driven-import");
app.synth();