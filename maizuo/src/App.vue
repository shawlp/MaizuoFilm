<template>
  <div class="wrap" v-scroll="showTop">
    <com-header :title="title" :city="city"></com-header>
    <div class="content-container">
        <router-view></router-view>      
    </div>
    <com-loading v-show='loading' />
    <com-sidebar></com-sidebar>
    <div @click="gotop" class="go-top" :class="goTop?'active':''">
        <i class="iconfont icon-gotop"></i>
    </div>
  </div>
</template>

<script>
  import './assets/reset.css'
  import {mapGetters} from 'vuex'

  import Header from './components/public/header'
  import Sidebar from './components/public/sidebar'
  import Loading from './components/public/loading'


  export default {
    data() {
      return {
          goTop: false
      }
    },
    components: {
      comHeader:Header,
      comSidebar:Sidebar,
      comLoading:Loading     
    },
    computed: mapGetters({
        title: 'getTitle',
        city: 'getCity',
        loading:'loading'                
    }),
    methods: {
      showTop() {
          if (document.body.scrollTop > 200) {
            this.goTop = true;
          } else {
            this.goTop = false;
          }
      },
      //返回顶部
      gotop() {
          let speed = 10;
          let timer = setInterval(function() {
            if (document.body.scrollTop > 0) {
                document.body.scrollTop = document.body.scrollTop-speed > 0 ? document.body.scrollTop-speed : 0 ;
                speed += 20;                    
            } else {
                clearInterval(timer)              
            }
          },16)
      }  
    }      
  }
</script>