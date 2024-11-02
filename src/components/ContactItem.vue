<template>
  <section class="flex flex-col items-center border border-lime-900 rounded-md">
    <p>{{ props.contact.name }}</p>
    <p>{{ props.contact.phone }}</p>
    <p>{{ props.contact.email }}</p>
    <div class="flex flex-row gap-4 p-2">
      <button
        class="p-2 border border-lime-900 rounded-lg"
        @click="editContact(props.contact.id)"
      >
        Edit
      </button>
      <button
        class="p-2 border border-lime-900 rounded-lg"
        @click="deleteContact(props.contact.id)"
      >
        Delete
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IContact } from "../types";
import { useRouter } from "vue-router";
import { useContactStore } from "../store/contact";

const router = useRouter();
const { deleteContact } = useContactStore();
function editContact(contactId?: number) {
  router.push({
    name: "edit",
    params: {
      id: contactId,
    },
  });
}

// import { IContact } from '../types';

const props = defineProps({
  contact: {
    type: Object as PropType<IContact>,
    required: true,
  },
});
</script>
