export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("admin_token").value;
  const path = to.path;
  const isLoginPage = path.split("/").slice(-1)[0] === "admin";
  const isDashboardPage = path.includes("/admin/dashboard");
  if (!token && isDashboardPage) {
    return navigateTo("/admin");
  }
  if (token && isLoginPage) {
    return navigateTo("/admin/dashboard");
  }
});
