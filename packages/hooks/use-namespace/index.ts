const namespace = "el";
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const useNamespace = (block: string) => {
  const b = (blockSuffix = "") => _bem(namespace, block, blockSuffix, "", "");
  const e = (element?: string) =>
    element ? _bem(namespace, block, "", element, "") : "";
  const m = (modifier?: string) =>
    modifier ? _bem(namespace, block, "", "", modifier) : "";
  return { b, e, m };
};
