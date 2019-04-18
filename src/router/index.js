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
import home362 from '@/components/home362'
import login362 from '@/components/login362'
import signup362 from '@/components/signup362'
import profile362 from '@/components/profile362'
import postitem362 from '@/components/postitem362'
import itemdetail362 from '@/components/itemdetail362'
import transaction362 from '@/components/transaction362'
import chat362 from '@/components/chat362'


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
    
     {
      path: '/home362',
      name: 'home362',
      component: home362
    },

    {
      path: '/login362',
      name: 'login362',
      component: login362
    },
     {
      path: '/signup362',
      name: 'signup362',
      component: signup362
    },
        {
      path: '/profile362',
      name: 'profile362',
      component:profile362
    },
            {
      path: '/postitem362',
      name: 'postitem362',
      component:postitem362
    },
                {
      path: '/itemdetail362',
      name: 'itemdetail362',
      component:itemdetail362
    },

    {
      path: '/transaction362',
      name: 'transaction362',
      component:transaction362
    },
        {
      path: '/chat362',
      name: 'chat362',
      component:chat362
    },
  ]
})
