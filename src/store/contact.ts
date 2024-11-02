import { defineStore } from "pinia";
import { ref, Ref, watch } from "vue";
import { IContact } from "../types";
import { data } from "../constants/data";
import { debounce } from "../helpers/debounce";

export const useContactStore = defineStore("contact", () => {
  const loading = ref(false);
  const query = ref("");

  const contacts: Ref<IContact[]> = ref([]);

  function cacheContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts.value));

    localStorage.setItem("query", query.value);
  }
  function updateCachedContacts() {
    localStorage.removeItem("contacts");
    localStorage.removeItem("query");
    fetchContacts();
  }
  function getCachedContacts() {
    const cachedContacts = localStorage.getItem("contacts");
    const cachedQuery = localStorage.getItem("query");

    if (cachedQuery) {
      query.value = cachedQuery;
    }
    if (cachedContacts) {
      // console.log("cachedContacts", cachedContacts);
      contacts.value = JSON.parse(cachedContacts);
    } else {
      fetchContacts();
    }
    return contacts.value;
  }

  function getContactById(id: number) {
    return contacts.value.find((contact) => contact.id === id);
  }

  function updateContact(contact: IContact) {
    const index = contacts.value.findIndex((c) => c.id === contact.id);
    contacts.value[index] = contact;
  }

  function fetchContacts() {
    loading.value = true;
    setTimeout(() => {
      if (query.value) {
        contacts.value = data.contacts;
        contacts.value = searchContact(query.value);

        cacheContacts();
      } else {
        contacts.value = data.contacts;
        cacheContacts();
      }

      loading.value = false;
    }, 1000);
  }

  function addContact(contact: IContact) {
    contact.id = data.contacts.at(-1)?.id + 1 || 1;

    // contacts.value.push(contact);
    data.contacts.push(contact);
    updateCachedContacts();
  }
  function deleteContact(contactId: number) {
    data.contacts = data.contacts.filter((contact) => contact.id !== contactId);
    updateCachedContacts();
    // fetchContacts();
  }

  function searchContact(searchTerm: string) {
    const lowercasedTerm = searchTerm.toLowerCase();
    if (!lowercasedTerm) {
      return contacts.value;
    }
    return contacts.value.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowercasedTerm) ||
        contact.phone.toLowerCase().includes(lowercasedTerm) ||
        contact.email.toLowerCase().includes(lowercasedTerm)
    );
  }

  watch(
    query,
    debounce(() => {
      console.log("query changed", query.value);
      fetchContacts();
    }, 300),
    {
      immediate: false,
    }
  );

  getCachedContacts();

  return {
    contacts,
    addContact,

    fetchContacts,
    loading,
    query,
    getContactById,
    deleteContact,
    updateContact,
  };
});
