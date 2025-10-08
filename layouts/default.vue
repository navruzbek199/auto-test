<template>
  <main>
    <div class="min-h-screen user-layout">
      <UserHeader />
      <div class="flex-1 mx-auto p-6 pt-20 content">
        <slot />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import UserHeader from "../components/userHeader.vue";
</script>

<style lang="scss" scoped>
.user-layout {
  background-image: url("../assets/images/hero.jpg");
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
