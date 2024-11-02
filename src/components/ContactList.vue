<template>
  <section class="">
    <h1 class="text-3xl text-black">Contact List</h1>
    <div class="flex flex-row gap-4 items-center p-2">
      <SearchBar />
      <button
        @click="goToAddContact()"
        class="rounded-md p-2 border border-lime-900 w-fit min-w-[140px]"
      >
        Add Contact
      </button>
    </div>
    <Transition name="slide-fade">
      <div class="flex flex-col items-center p-4">
        <Loading v-if="loading" />
        <TransitionGroup
          name="list"
          v-else-if="contacts.length"
          tag="div"
          appear
          class="flex flex-col space-y-2 w-full"
        >
          <ContactItem
            v-for="contact in contacts"
            :key="contact.id"
            :contact="contact"
          ></ContactItem>
        </TransitionGroup>
        <!-- <div class="flex flex-col space-y-2 w-full" v-else>
         
        </div> -->

        <div v-if="!contacts.length && !loading">
          <p>No contacts found</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useContactStore } from "../store/contact";
import ContactItem from "./ContactItem.vue";
import { onMounted } from "vue";
import Loading from "./Loading.vue";
import SearchBar from "./SearchBar.vue";
import { useRoute, useRouter } from "vue-router";

const contactStore = useContactStore();
const { contacts, loading } = storeToRefs(contactStore);

const router = useRouter();
const route = useRoute();

function goToAddContact() {
  router.push({
    name: "add",
  });
}
// onMounted(() => {
//   contactStore.fetchContacts();
// });
</script>
