import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/login-user',
      name: 'login-user',
      component: () => import('@/views/Login/user.vue')
    },
    {
      path: '/login-admin',
      name: 'login-admin',
      component: () => import('@/views/Login/admin.vue')
    },
    {
      path: '/login-other',
      name: 'login-other',
      component: () => import('@/views/Login/other.vue')
    },
    {
      path: '/app',
      name: 'Layout',
      redirect: "/app/car",
      component: () => import('@/layout/Home.vue'),
      children: [
        {
          path: 'car',
          name: 'car',
          component: () => import('../views/carView.vue')
        },
        {
          path: 'add-car',
          name: 'add-car',
          component: () => import('../views/addNewCar.vue')
        },
        {
          path: 'reserve',
          name: 'reserve',
          component: () => import('../views/carReserve.vue')
        },
      ]
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
  ]
})

export default router
