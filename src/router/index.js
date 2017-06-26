import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/Auth'
import Home from '@/components/Home'
import Authorise from '@/components/Authorise'
import Login from '@/components/Login'
import AnimTest from '@/components/Animtest'
Vue.use(Router)

function requireAuth (to, from, next) {
  if (!Auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/authorise/:userName',
      name: 'Authorise',
      component: Authorise
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/animtest/',
      name: 'AnimTest',
      component: AnimTest
    }
  ]
})
