import { createRouter, createWebHistory } from 'vue-router';
import Minesweeper from '@/pages/Minesweeper.vue';

const routes = [
  {
    path: '/',
    component: Minesweeper,
    meta: {
      title: 'Minesweeper'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Vue PlayGround';
  }
  next();
});

export default router;
