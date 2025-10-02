<template>
  <div class="wrapper full-screen">
    <div class="the-header">
      <HeaderDashboard />
    </div>
    <div class="the-sidebar">
      <SidebarDashboard />
    </div>
    <div class="content relative">
      <slot />
    </div>
  </div>
</template>

<script setup>
import HeaderDashboard from "~/components/Dashboard/headerDashboard.vue";
import SidebarDashboard from "~/components/Dashboard/sidebarDashboard.vue";
definePageMeta({
  layout: "admin",
});
</script>

<style scoped></style>
