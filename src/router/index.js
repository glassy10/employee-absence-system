import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Authorise from '@/components/Authorise'
import AnimTest from '@/components/Animtest'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/authorise/:userName',
      name: 'Authorise',
      component: Authorise
    },
    {
      path: '/animtest/',
      name: 'AnimTest',
      component: AnimTest
    }
  ]
})
