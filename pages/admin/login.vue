<template>
  <div class="h-screen flex items-center justify-center">
    <form
      @submit.prevent="onLogin"
      class="rounded-xl px-8 pt-6 pb-8 min-w-[400px]"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center text-[#27366E]">
        Login
      </h2>

      <div class="mb-4">
        <label
          class="block text-[#27366E] text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-[#27366E] focus:ring-2 focus:ring-[#27366E] focus:border-[#27366E] outline-none transition duration-200"
        />
      </div>

      <div class="mb-6 relative">
        <label
          class="block text-[#27366E] text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-[#27366E] mb-3 leading-tight focus:ring-2 focus:ring-[#27366E] focus:border-[#27366E] outline-none transition duration-200"
        />
        <button
          type="button"
          @click="togglePassword"
          class="absolute right-3 top-9 text-gray-500 hover:text-[#27366E]"
        >
          <span v-if="showPassword">🙈</span>
          <span v-else>👁️</span>
        </button>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-[#27366E] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useAuthStore } from "../../store/auth";
const username = ref("");
const password = ref("");
const router = useRouter();
// const auth = useAuthStore();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const onLogin = async () => {
  //   const success = await auth.login(username.value, password.value);
  //   if (success && auth.accessToken) {
  //     router.push("/admin/dashboard/projects");
  //   } else {
  //     alert("Login failed. Please check your credentials.");
  //   }
  console.log(username.value, password.value, "login");
};
</script>
