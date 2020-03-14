const currentAuth = ["admin"];
export { currentAuth };

// 获取当前用户权限【通常从后台获取】
export function getCurrentAuthority() {
  return currentAuth;
}

// 用户数据权限校验
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(itme => authority.includes(itme));
}

// 检验用户是否登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
