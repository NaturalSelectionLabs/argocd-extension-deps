import { DEPS_ANNOTATION_PREFIX } from "./const";
import { parseArn } from "./arn";

export const parseAnnotations = (annotations: { [key: string]: string }) => {
  return Object.entries(annotations)
    .filter(([key]) => key.startsWith(DEPS_ANNOTATION_PREFIX))
    .map(([key, value]) => parseAnnotation(key, value));
};

// key: DEPS_ANNOTATION_PREFIX/<name>.<type>
const parseAnnotation = (key: string, value: string) => {
  // use regex match key

  const match = key.match(
    new RegExp(`^${DEPS_ANNOTATION_PREFIX}/(.+)\\.(.+)$`)
  );
  if (!match) {
    return undefined;
  }
  if (match.length !== 3) {
    return undefined;
  }
  const [, name, type] = match;
  return {
    name,
    type,
    data: parseValueByType(type, value),
    value,
    key,
  };
};

const parseValueByType = (type: string, value: string) => {
  switch (type) {
    case "arn":
      return parseArn(value);
    default:
      return value;
  }
};
