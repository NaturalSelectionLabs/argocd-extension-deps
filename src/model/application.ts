import type { ObjectMeta } from "./meta";

export interface Application {
  apiVersion?: string;
  kind?: string;
  metadata: ObjectMeta;
  //   spec: ApplicationSetSpec;
  //   status?: ApplicationSetStatus;
}
