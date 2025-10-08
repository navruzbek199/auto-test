<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-center px-6 py-6 text-[#27366E]">
      <img src="../../assets/images/logo-mega.svg" alt="" />
    </div>
    <div class="flex flex-col gap-4 px-4">
      <div
        v-for="item in menuItems"
        :key="item.name"
        @click="goTo(item.route)"
        :class="{
          'bg-[#fff] text-[#27366E] p-2 rounded-md text-left font-bold':
            isActive(item.route),
          'bg-transparent text-[#ffffff] p-2 text-left font-semibold':
            !isActive(item.route),
        }"
        class="text-lg cursor-pointer"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const menuItems = [
  { name: "Questions", route: `/admin/components/questions` },
  { name: "Users", route: `/admin/components/users` },
];
const isActive = (path: string) => {
  return route.path === path;
};
const goTo = (path: string) => {
  if (route.path !== path) {
    router.push(path);
  }
};
</script>
