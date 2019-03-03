import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import temp from '@/components/temp'
import signup from '@/components/signup'
import login from '@/components/login'
import example from '@/components/example'
import item from '@/components/item'
import home from '@/components/home'
import justforfine from '@/components/justforfine'
import homeheader from '@/components/home-header'
import menuside from '@/components/menu-side'
import myprofile from '@/components/myprofile'
import post from '@/components/post'
import itemimage from '@/components/itemimage'
import schoolselect from '@/components/schoolselect'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/temp',
      name: 'temp',
      component: temp
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/example',
      name: 'example',
      component: example
    },
        {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/item',
      name: 'item',
      component: item
    },
    {
      path: '/justforfine',
      name: 'justforfine',
      component: justforfine
    },
    {
      path: '/homeheader',
      name: 'homeheader',
      component: homeheader
    },
    {
      path: '/menuside',
      name: 'menuside',
      component: menuside
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: myprofile
    },
    {
      path: '/post',
      name: 'post',
      component: post
    },
    {
      path: '/itemimage',
      name: 'itemimage',
      component: itemimage
    },
    {
      path: '/schoolselect',
      name: 'schoolselect',
      component: schoolselect
    },
    
  ]
})
