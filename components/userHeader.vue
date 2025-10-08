<template>
  <header class="z-50 bg-blue-600 text-white p-4 shadow">
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
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function changeLang(e: Event) {
  locale.value = (e.target as HTMLSelectElement).value;
}
</script>
