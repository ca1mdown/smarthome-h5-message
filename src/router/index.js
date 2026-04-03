import { createRouter, createWebHistory } from 'vue-router';
import MessageNotification from '../views/MessageNotification.vue';
import ActivityList from '../views/ActivityList.vue';
import SystemMessages from '../views/SystemMessages.vue';
import Detail from '../views/Detail.vue';

const routes = [
  { path: '/', redirect: '/notification' },
  { path: '/notification', component: MessageNotification },
  { path: '/settings', redirect: '/notification' },
  { path: '/center', redirect: '/notification' },
  { path: '/activity', component: ActivityList },
  { path: '/system', component: SystemMessages },
  { path: '/detail', component: Detail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
