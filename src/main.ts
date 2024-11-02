import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import { createWebHistory, createRouter } from "vue-router";

import ContactList from "./components/ContactList.vue";
import ContactForm from "./components/ContactForm.vue";

const routes = [
  { path: "/", component: ContactList, name: "home" },
  { path: "/edit/:id", component: ContactForm, name: "edit" },
  { path: "/add", component: ContactForm, name: "add" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
