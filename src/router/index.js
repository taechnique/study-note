import { createRouter, createWebHistory } from 'vue-router'
import MainBody from "@/components/global/MainBody";
import PostView from "@/components/PostView";


const routes = [
  {
    path: '/',
    name: 'home',
    component: MainBody
  },
  {
    path: '/categories',
    name: 'categories',
    component: MainBody
  },
  {
    path: '/tags',
    name: 'tags',
    component: MainBody
  },
  {
    path:'/docs/:dir/:post',
    name: 'post',
    component: PostView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from ,savedPosition) {
    if(savedPosition)
      return savedPosition

    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
