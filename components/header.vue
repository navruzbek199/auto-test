<template>
  <div class="flex items-center justify-between px-3 py-4">
    <div class="flex items-center gap-x-2 sm:gap-x-4">
      <div class="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s"
          class="w-full h-full object-cover"
          alt="your img"
        />
      </div>
      <div class="flex flex-col items-start cursor-pointer">
        <h4
          class="text-start text-[#fff] text-sm font-normal tracking-tight sm:tracking-normal line-clamp-1"
        >
          {{ user?.username }}
        </h4>
        <p
          class="text-right text-[#fff] text-xs font-normal tracking-tight sm:tracking-normal"
        >
          {{ user?.email || "No Data" }}
        </p>
      </div>
    </div>
    <div class="border border-[#fff] rounded-lg cursor-pointer" @click="logout">
      <div class="flex items-center gap-[10px] px-3 sm:px-4 py-2 sm:py-3">
        <LogoutIcon class="h-5 w-5 stroke-[#fff]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import LogoutIcon from "../Icons/logoutIcon.vue";

const store = useAuthStore();
const user = computed(() => store.user);

const logout = () => {
  store.resetToken();
  navigateTo("/admin");
};

// onMounted(() => {
//   user.getUsers();
// });
</script>
