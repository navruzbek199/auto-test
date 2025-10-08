<template>
  <div>
    <div class="p-4">
      <button
        @click="handleAdd"
        class="bg-[#27366E] text-white float-right px-4 py-2 rounded-md mb-4"
      >
        Add question
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const handleAdd = () => {
  console.log("add question");
};
</script>
