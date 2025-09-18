import type { Tree, Application } from "./model";

export const Extension = (props: { tree: Tree; resource: Application }) => (
  <div>
    <h1>Application {props.resource.metadata.name}</h1>
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
export const component = Extension;

// Register the component extension in ArgoCD
// eslint-disable-next-line @typescript-eslint/no-explicit-any
((window: any) => {
  window?.extensionsAPI?.registerResourceExtension?.(
    component,
    "*",
    "Application",
    "Deps"
  );
})(window);
