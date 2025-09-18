import type { Tree, Application } from "./model";

export const Extension = (props: { tree: Tree; resource: Application }) => (
  <div>
    <h1>Application {props.resource.metadata.name}</h1>
  </div>
);
