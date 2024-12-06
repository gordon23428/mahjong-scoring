import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
	path: '/scoring',
	name: 'Scoring',
	component: () => import('@/pages/Scoring.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router