export default defineNuxtRouteMiddleware((to, from) => {
  const adminToken = useCookie("admin_token");
  if (to.path.startsWith("/admin")) {
    if (!adminToken.value && to.path !== "/admin/login") {
      return navigateTo("/admin/login");
    }
    if (adminToken.value && to.path === "/admin/login") {
      return navigateTo("/admin/dashboard");
    }
  }
});
