import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/pages/home'
import Detail from '@/components/pages/detail'
import Film from '@/components/pages/film'
import Cinema from '@/components/pages/cinema'
import CinemaDetail from '@/components/pages/cinemadetail'
import CinemaById from '@/components/pages/cinemaById'
import City from '@/components/pages/city'
import Login from '@/components/pages/login'
import Card from '@/components/pages/card'
import Ticket from '@/components/pages/ticket'
import TicketDetail from '@/components/pages/ticketdetail'
import TicketToCreate from '@/components/pages/ticketToCreate'
import TicketPreOrder from '@/components/pages/ticketPreOrder'

import ShopHome from '@/components/pages/shop/ShopHome'
import Category from '@/components/pages/shop/category'
import Active from '@/components/pages/shop/active'
import ActiveList from '@/components/pages/shop/activelist'
import ShopDetail from '@/components/pages/shop/ShopDetail'
import ShopPreOrder from '@/components/pages/shop/ShopPreOrder'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',component: Home },
    { path: '/home', name: 'home', component: Home },
    { path: '/detail/:id', name:'detail', component: Detail },
    { path: '/film/:type', name: 'film', component: Film },
    { path: '/cinema', name: 'cinema', component: Cinema }, 
    { path: '/cinema/:id', name: 'cinemadetail', component: CinemaDetail },
    { path: '/film/:id/cinema', name: 'cinemaById', component: CinemaById },
    { path: '/city', name: 'city', component: City },   
    { path: '/login', name: 'login', component: Login },
    { path: '/card/query', name: 'card', component: Card }, 
    { path: '/ticket', name: 'ticket', component: Ticket },
    { path: '/ticket/:id', name: 'ticketById', component: TicketDetail},
    { path: '/ticket/:id/to-create', name: 'ticketToCreate', component: TicketToCreate},   
    { path: '/ticket/:id/preorder', name: 'ticketPreOrder', component: TicketPreOrder}, 
    { path: '/shop', name: 'shopHome', component: ShopHome},  
    { path: '/shop/category/:id', name: 'category', component: Category},
    { path: '/act/active/:id', name: 'active', component: Active},                          
    { path: '/activelist/:id', name: 'activelist', component: ActiveList },
    { path: '/shop/item/:id', name: 'shopdetail', component: ShopDetail },
    { path: '/shop/:id/preorder', name: 'shopPreOrder', component: ShopPreOrder},         
    { path: '/*',component: Home }   
  ]
})
