export const REACT_APP_PROXY =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "map.chicommons.com"
    : "dev.chicommons.com";
