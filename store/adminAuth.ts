import { defineStore } from "pinia";
import axios from "axios";
import { useAccessToken, useRefreshToken } from "~/utils/cookies";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as any,
    user: null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post("/auth/login", {
          username,
          password,
        });
        const token = response.data.token;
        const user = response.data.user;
        this.accessToken = token;
        this.user = user;
        useAccessToken().value = token;
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    resetToken() {
      useAccessToken().value = null;
      useRefreshToken().value = null;

      this.accessToken = null;
      this.user = null;
    },
  },
});
