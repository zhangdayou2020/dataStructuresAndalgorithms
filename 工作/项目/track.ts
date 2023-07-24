type IType =
  | "xhr"
  | "fetch"
  | "windowError"
  | "consoleMethods"
  | "sourceError"
  | "unhandledrejection"
  | "userEvent";
type ISumitType = "myTract" | "zlcft"; // myTract 通用上报  zlcft 日志native上报
// pagePath:/pass/detail.html#/frontend/main/workbench
// routePath:/frontend/main/workbench
type IpagePathType = "pagePath" | "routePath"; // 默认为pagePath
