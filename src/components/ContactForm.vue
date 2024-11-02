<template>
  <section
    class="flex flex-col items-center border border-lime-900 rounded-md m-10"
  >
    <h1 class="text-3xl text-black p-2">Contact Form</h1>
    <form @submit.prevent class="flex flex-col items-center p-4 space-y-2">
      <input
        type="text"
        class="w-full rounded-md p-2 border border-lime-900"
        placeholder="Name"
        v-model="selectedContact.name"
      />
      <input
        type="text"
        class="w-full rounded-md p-2 border border-lime-900"
        placeholder="Phone"
        v-model="selectedContact.phone"
      />
      <input
        type="email"
        class="w-full rounded-md p-2 border border-lime-900"
        placeholder="Email"
        v-model="selectedContact.email"
      />
      <button
        type="button"
        @click="updateContact"
        v-if="isEditing"
        class="w-full rounded-md p-2 border border-lime-900"
      >
        Update contact
      </button>
      <button
        type="button"
        v-else
        @click="createContact"
        class="w-full rounded-md p-2 border border-lime-900"
      >
        Create contact
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import { useContactStore } from "../store/contact";
import { IContact } from "../types";

const contactStore = useContactStore();
const { getContactById } = contactStore;

const router = useRouter();
const isEditing = ref(false);
const selectedContact: Ref<IContact> = ref({
  id: 0,
  name: "",
  phone: "",
  email: "",
});

onMounted(() => {
  const contactId = Number(router.currentRoute.value.params.id);
  if (contactId) {
    isEditing.value = true;
    selectedContact.value = getContactById(contactId) || selectedContact.value;
  }
});

function updateContact() {
  contactStore.updateContact(selectedContact.value);
  router.push({ name: "home" });
}

function createContact() {
  contactStore.addContact(selectedContact.value);
  router.push({ name: "home" });
}
</script>
