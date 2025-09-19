// parse arn string to object

export interface Arn {
  partition: string;
  service: string;
  region: string;
  account: string;
  resource: string;
}

export const parseArn = (arn: string): Arn | undefined => {
  const r = new RegExp(
    "arn:(?<partition>.+):(?<service>.+):(?<region>.*):(?<account>.*):(?<resource>.+)"
  );
  const match = arn.match(r);
  if (!match) {
    return undefined;
  }
  const [, partition, service, region, account, resource] = match;
  return {
    partition,
    service,
    region,
    account,
    resource,
  };
};

export const ArnLink = ({
  partition,
  service,
  region,
  account,
  resource,
}: Arn) => {
  if (partition === "argocd") {
    return `/${service}/${resource}?view=tree`;
  }

  if (partition === "acs") {
    if (service === "rds") {
      return `https://rds.console.alibabacloud.com/detail/${resource}/basicInfo`;
    }
    if (service === "kvstore") {
      return `https://kvstore.console.aliyun.com/Redis/instance/${region}/${resource}`;
    }
  }

  if (partition === "cloudflare") {
    if (service === "r2") {
      return `https://dash.cloudflare.com/${account}/r2/default/buckets/${resource}`;
    }
  }
};
