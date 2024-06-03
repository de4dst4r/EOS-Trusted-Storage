import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import LoginView from '@/views/LoginView.vue'
import LoginnView from '@/views/LoginnView.vue'

const routes = [
  {
    path:'/',
    name: 'main',
    component: LoginnView
  },
  {
    path:'/login',
    name: 'login',
    component: LoginnView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterrView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
