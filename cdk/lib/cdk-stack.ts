import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
  aws_s3,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_iam,
  RemovalPolicy,
  aws_wafv2, Duration,
} from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // IPSet
    const allowedIpV4Set = new aws_wafv2.CfnIPSet(this, 'allowedIpV4Set', {
      name: 'allowedIpV4Set',
      addresses: [
        // NOTE
      ],
      ipAddressVersion: 'IPV4',
      scope: 'CLOUDFRONT',
      description: 'IP addresses that can be connected',
    });
    const allowedIpV6Set = new aws_wafv2.CfnIPSet(this, 'allowedIpV6Set', {
      name: 'allowedIpV6Set',
      addresses: [
        // NOTE
      ],
      ipAddressVersion: 'IPV6',
      scope: 'CLOUDFRONT',
      description: 'IP addresses that can be connected',
    });
    // WAF
    const websiteWafV2WebAcl = new aws_wafv2.CfnWebACL(this, "WafV2WebAcl", {
      defaultAction: { block: {} },
      scope: "CLOUDFRONT",
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: true,
        metricName: "websiteWafV2WebAcl",
      },
      rules: [
        // IP許可リストのルールはPriorityを最後にする
        {
          name: "AllowIpV4SetRule",
          priority: 0,
          statement: {
            ipSetReferenceStatement: {
              arn: allowedIpV4Set.attrArn,
            },
          },
          action: { allow: {} },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: "AllowIpV4SetRule",
          },
        },
        {
          name: "AllowIpV6SetRule",
          priority: 1,
          statement: {
            ipSetReferenceStatement: {
              arn: allowedIpV6Set.attrArn,
            },
          },
          action: { allow: {} },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: "AllowIpV6SetRule",
          },
        },
      ],
    });

    // S3
    const websiteBucket = new aws_s3.Bucket(this, 'WebsiteBucket', {
      bucketName: "sample-ui",
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const originAccessIdentity = new aws_cloudfront.OriginAccessIdentity(
        this,
        'OriginAccessIdentity',
        {
          comment: 'website-distribution-originAccessIdentity',
        }
    );

    const webSiteBucketPolicyStatement = new aws_iam.PolicyStatement({
      actions: ['s3:GetObject'],
      effect: aws_iam.Effect.ALLOW,
      principals: [
        new aws_iam.CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
      resources: [`${websiteBucket.bucketArn}/*`],
    });

    websiteBucket.addToResourcePolicy(webSiteBucketPolicyStatement);

    const websiteDistribution = new aws_cloudfront.Distribution(this, "distribution", {
      comment: "website-distribution",
      defaultRootObject: "index.html",
      errorResponses: [
        {
          ttl: Duration.seconds(0),
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
      defaultBehavior: {
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new aws_cloudfront_origins.S3Origin(websiteBucket),
      },
      priceClass: aws_cloudfront.PriceClass.PRICE_CLASS_ALL,
      webAclId: websiteWafV2WebAcl.attrArn,
    });

    new s3deploy.BucketDeployment(this, 'WebsiteDeploy', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: websiteBucket,
      distribution: websiteDistribution,
      distributionPaths: ['/*'],
    });
  }
}
