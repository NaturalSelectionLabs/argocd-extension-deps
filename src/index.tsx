import { parseAnnotations } from "./annotations";
import type { Tree, Application } from "./model";
import { ArnLink, type Arn } from "./arn";

export const Extension = (props: { tree: Tree; application: Application }) => {
  type Data = string | Arn | URL;

  const resourceLink = (type: string, data: Data | undefined) => {
    if (type === "url") {
      return data as string;
    }
    if (type === "arn" && data !== undefined) {
      return ArnLink(data as Arn);
    }
  };

  const renderLink = (type: string, value: string, data: Data | undefined) => {
    const link = resourceLink(type, data);
    return link && link !== "" ? (
      <a href={link} target="_blank">
        {value}
        &nbsp;
        <i className="fa fa-external-link-alt" />
      </a>
    ) : (
      <p>{value}</p>
    );
  };

  return (
    <div>
      <div className="argo-table-list">
        <div className="argo-table-list__head">
          <div className="row">
            <div className="columns small-1 xxxlarge-1">DEPS</div>
            <div className="columns small-2 xxxlarge-1">NAME</div>
          </div>
        </div>
        {parseAnnotations(props.application.metadata.annotations ?? {})
          .filter((o) => o !== undefined)
          .map(({ name, type, value, data, key }) => (
            <div className="argo-table-list__row" key={key}>
              <div className="row">
                <div className="columns small-1 xxxlarge-1">
                  <div className="application-details__resource-icon">
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        padding: "0px 4px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgb(143, 164, 177)",
                        textAlign: "center",
                        lineHeight: "30px",
                      }}
                    >
                      <span style={{ color: "white", fontSize: "1.5em" }}>
                        {type.toUpperCase().slice(0, 1)}
                      </span>
                    </div>
                    <br />
                    <div>{type}</div>
                  </div>
                </div>
                <div className="columns small-2 xxxlarge-1">{name}</div>
                <div className="columns small-full xxxlarge-full">
                  {renderLink(type, value, data)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const component = Extension;

// Register the component extension in ArgoCD
// eslint-disable-next-line @typescript-eslint/no-explicit-any
((window: any) => {
  window?.extensionsAPI?.registerAppViewExtension?.(
    component,
    "deps",
    "fa fa-hexagon-nodes-bolt"
  );
})(window);
