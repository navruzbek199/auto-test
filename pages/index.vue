<template>
  <section
    class="container h-screen mx-auto flex flex-col items-center justify-center overflow-hidden w-full"
  >
    <div class="flex flex-col justify-center gap-4 w-full max-w-sm">
      <button
        @click="goTo('test')"
        class="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition cursor-pointer"
      >
        {{ $t("app.test") }}
      </button>
      <button
        @click="goTo('exam')"
        class="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition cursor-pointer"
      >
        {{ $t("app.exam") }}
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
const router = useRouter();
function goTo(page: string) {
  router.push({ name: page });
}
onMounted(() => {});
</script>

<style scoped lang="scss"></style>
