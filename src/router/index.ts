import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import K_dospely from '@/views/Kolobezka_dospela.vue'
import K_detska from '@/views/Kolobezka_detska.vue'
import K_elektricka from '@/views/Kolobezka_elektricka.vue'
import Kosik from '@/views/Kosik.vue'
import Rezervace from '@/views/Rezervace.vue'
import SeznamRezervaci from '@/views/SeznamRezervaci.vue'
import Succes from '@/views/Succes.vue'
import Login from '@/views/Login.vue'
import mmm from '@/views/mmm.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    
    component: About
  }
  ,
  {
    path: '/k_dospely',
    name: 'K_dospely',
    
    component: K_dospely
  }
  ,
  {
    path: '/k_detska',
    name: 'K_detska',
    
    component: K_detska
  }
  ,
  {
    path: '/k_elektricka',
    name: 'K_elektricaka',
    
    component: K_elektricka
  }
  ,
  {
    path: '/kosik',
    name: 'Kosik',
    
    component: Kosik
  }
  ,
  {
    path: '/rezervace',
    name: 'Rezervace',
    
    component: Rezervace
  },
  {
    path: '/SeznamRezervaci',
    name: 'SeznamRezervaci',
    
    component: SeznamRezervaci,

    meta: {requiersAuth: true}
  },
  {
    path: '/Succes',
    name: 'Succes',
    
    component: Succes
  },
  {
    path: '/Login',
    name: 'Login',
    
    component: Login
  },
  {
    path: '/mmm',
    name: 'mmm',
    
    component: mmm
  }
]


const router = new VueRouter({
  mode: 'history',  
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };}
})


router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiersAuth)){
    if(!localStorage.user){
      next({name: "Login"});
    }
    else {next();}
      
    
    
  }
  else{ next(); }
});

export default router
