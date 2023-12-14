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
      component: () => import('@/views/Login/employee.vue')
    },
    {
      path: '/login-admin',
      name: 'login-admin',
      component: () => import('@/views/Login/admin.vue'),
    },
    {
      path: '/login-other',
      name: 'login-other',
      component: () => import('@/views/Login/driver.vue')
    },

    // admin page
    {
      path: '/admin',
      name: 'admin-layout',
      redirect: "/admin/admin-car",
      component: () => import('@/layout/Admin/index.vue'),
      children: [
        {
          path: 'admin-car',
          name: 'admin-car',
          component: () => import('@/views/Admin/carView.vue')
        },
        {
          path: 'admin-reserve',
          name: 'admin-reserve',
          component: () => import('@/views/Admin/carReserve.vue')
        },
        {
          path: 'admin-product',
          name: 'admin-product',
          component: () => import('@/views/Admin/product.vue')
        },
        {
          path: 'admin-add-car',
          name: 'admin-add-car',
          component: () => import('@/views/Admin/addNewCar.vue')
        },
        {
          path: 'admin-add-product',
          name: 'admin-add-product',
          component: () => import('@/views/Admin/addNewProduct.vue')
        },
        {
          path: 'admin-register',
          name: 'admin-register',
          component: () => import('@/views/Login/Register/register.vue')
        }
      ]
    },

    // employee page
    {
      path: '/employee',
      name: 'employee-layout',
      redirect: "/employee/employee-car",
      component: () => import('@/layout/User/index.vue'),
      children: [
        {
          path: 'employee-car',
          name: 'employee-car',
          component: () => import('../views/Employee/carView.vue')
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
