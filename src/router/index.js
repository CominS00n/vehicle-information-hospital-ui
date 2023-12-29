import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/constant/accountLogin'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
      component: () => import('@/views/Login/admin.vue')
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
      redirect: '/admin/admin-user-manage',
      component: () => import('@/layout/Admin/index.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          toast.error('กรุณาเข้าสู่ระบบ', { timeout: 2000 })
          next({ name: 'login-admin' })
        }
      },
      children: [
        {
          path: 'admin-user-manage',
          name: 'admin-user-manage',
          component: () => import('@/views/Admin/userManage/userManagement.vue')
        },
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
        {
          path: 'admin-view-reserve',
          name: 'admin-view-reserve',
          component: () => import('@/views/Admin/reserveView.vue')
        },
      ]
    },

    // employee page
    {
      path: '/employee',
      name: 'employee-layout',
      redirect: '/employee/employee-reserve',
      component: () => import('@/layout/User/index.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          toast.error('กรุณาเข้าสู่ระบบ', { timeout: 2000 })
          next({ name: 'login-employee' })
        }
      },
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
        {
          path: 'employee-view-reserve',
          name: 'employee-view-reserve',
          component: () => import('@/views/Employee/reserveView.vue')
        },
      ]
    },

    // driver page
    {
      path: '/driver',
      name: 'driver-layout',
      redirect: '/driver/driver-car',
      component: () => import('@/layout/Driver/index.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          toast.error('กรุณาเข้าสู่ระบบ', { timeout: 2000 })
          next({ name: 'login-driver' })
        }
      },
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
        }
      ]
    },

    // 404 page
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/views/404.vue')
    }
  ]
})

export default router
