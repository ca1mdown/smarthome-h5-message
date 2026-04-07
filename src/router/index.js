import { createRouter, createWebHistory } from 'vue-router';
import MessageNotification from '../views/MessageNotification.vue';
import MessageList from '../views/MessageList.vue';
import Detail from '../views/Detail.vue';

const routes = [
  { path: '/', redirect: '/notification' },
  { path: '/notification', component: MessageNotification },
  { path: '/settings', redirect: '/notification' },
  { path: '/center', redirect: '/notification' },
  { path: '/message-list', component: MessageList },
  { path: '/detail', component: Detail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
