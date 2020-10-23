import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path:'/',
    component:()=>import('@/views/layout'),
    children:[
      {
        path:'/',
        name:'home',
        component:()=>import('@/views/home')
      },
      {
        path:'/personal',
        name:'personal',
        component:()=>import('@/views/personal')
      }
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
