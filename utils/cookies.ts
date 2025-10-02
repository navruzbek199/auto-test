export const useAccessToken = () =>
  useCookie<string | null>("auto_test_access_token");
export const useRefreshToken = () => useCookie<string | null>("refresh_token");
