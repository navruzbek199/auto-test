<template>
  <!-- <div class="wrapper full-screen">
    <div class="the-header">
      <HeaderDashboard />
    </div>
    <div class="the-sidebar">
      <SidebarDashboard />
    </div>
    <div class="content relative">
      <slot />
    </div>
  </div> -->
  <div class="bg-red-100 min-h-screen">
    <h1 class="text-red-600 font-bold text-center p-4">
      ADMIN LAYOUT ACTIVE ✅
    </h1>
    <slot />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
</script>

<style scoped></style>
