<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 shadow"
    >
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-lg font-bold">My App</h1>
        <nav class="flex gap-4">
          <select
            :value="locale"
            @change="changeLang"
            class="bg-blue-500 text-white rounded px-2 py-1 cursor-pointer focus:outline-none"
          >
            <option value="uz">Uzb</option>
            <option value="ru">Рус</option>
            <option value="oz">Ўзб</option>
          </select>

          <NuxtLink
            to="/login"
            class="bg-white text-blue-600 font-semibold px-4 py-1 rounded-lg shadow hover:bg-gray-100 transition"
          >
            {{ $t("app.login") }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 mx-auto p-6 pt-20">
      <slot />
    </main>

    <!-- <footer class="bg-gray-800 text-gray-200 p-4">
      <div class="container mx-auto text-center text-sm">
        © {{ new Date().getFullYear() }} My App. All rights reserved.
      </div>
    </footer> -->
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function changeLang(e: Event) {
  locale.value = (e.target as HTMLSelectElement).value;
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("../assets/images/hero.jpg");
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
