import Vue from 'vue'
import Vuex from 'vuex'

import com from './modules/com'
import home from './modules/home'
import detail from './modules/detail'
import film from './modules/film'
import cinema from './modules/cinema'
import cinemadetail from './modules/cinemadetail'
import city from './modules/city'
import ticket from './modules/ticket'
import ticketdetail from './modules/ticketdetail'
import shop from './modules/shop'
import category from './modules/category'
import active from './modules/active'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
       com,
       home,
       detail,
       film,
       cinema,
       cinemadetail,
       city,
       ticket,
       ticketdetail,
       shop,
       category,
       active
    }
})

export default store;