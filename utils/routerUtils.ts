import { Href } from "expo-router";
import { replace } from "lodash";


const buildRoute = (route: Href, params: Record<string, string | number>) => {
  let builtRoute = String((route));
  Object.keys(params).forEach((key) => {
    builtRoute = replace(builtRoute, `[${key}]`, String(params[key]));
  });
  return builtRoute as any;
};

const buildHref = <T extends string>(
  route: T,
  params: Record<string, string | number> = {}
): Href<T> => {
  let href = route as string;
  Object.keys(params).forEach((key) => {
    href = href.replace(`[${key}]`, String(params[key]));
  });
  return href as Href<T>;
};

const routerUtils = {
  buildRoute,
  buildHref
};

export default routerUtils;
