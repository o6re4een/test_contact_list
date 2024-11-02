<template>
  <div class="w-full">
    <input
      type="text"
      class="w-full rounded-md p-2 border border-lime-900"
      placeholder="Search"
      v-model="query"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useContactStore } from "../store/contact";

const contactsStore = useContactStore();
const { query } = storeToRefs(contactsStore);
</script>

<style lang="scss" scoped></style>
