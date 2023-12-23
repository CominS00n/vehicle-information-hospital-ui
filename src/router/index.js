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
      path: '/login-employee',
      name: 'login-employee',
      component: () => import('@/views/Login/employee.vue')
    },
    {
      path: '/login-admin',
      name: 'login-admin',
      component: () => import('@/views/Login/admin.vue'),
    },
    {
      path: '/login-driver',
      name: 'login-driver',
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
        },
        {
          path: 'admin-car-use',
          name: 'admin-car-use',
          component: () => import('@/views/Admin/reportUseCars.vue')
        },
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
          component: () => import('@/views/Employee/carView.vue')
        },
        {
          path: 'employee-reserve',
          name: 'employee-reserve',
          component: () => import('@/views/Employee/carReserve.vue')
        },
        {
          path: 'employee-car-use',
          name: 'employee-car-use',
          component: () => import('@/views/Employee/reportUseCars.vue')
        },
      ]
    },

     // driver page
     {
      path: '/driver',
      name: 'driver-layout',
      redirect: "/driver/driver-car",
      component: () => import('@/layout/Driver/index.vue'),
      children: [
        {
          path: 'driver-car',
          name: 'driver-car',
          component: () => import('@/views/Driver/reportUseCars.vue')
        },
        {
          path: 'driver-withdraw',
          name: 'driver-withdraw',
          component: () => import('@/views/Driver/equipmentWithdraw.vue')
        },
        {
          path: 'driver-input-data',
          name: 'driver-input-data',
          component: () => import('@/views/Driver/inputCarData.vue')
        },
      ]
    },

    // 404 page
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
  ]
})

export default router
