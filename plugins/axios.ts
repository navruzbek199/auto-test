import axios from "axios";
import { useCookie, useRuntimeConfig } from "nuxt/app";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  axios.defaults.baseURL = config.public.API_BASE_URL;
  axios.interceptors.request.use((config) => {
    const token = useCookie("auto_test_access_token")?.value;
    const locale = (nuxtApp.$i18n as any)?.locale?.value || "uz";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept"] = "application/json, multipart/form-data";
    config.headers["Accept-Language"] = locale;
    return config;
  });
});
