<template>
    <transition name="sidebar">
        <div id="sidebar" @click='hideNav' v-show="show">
            <div class="sidebar-container">
                <transition name="slide">
                    <nav v-show="show">
                        <ul>
                            <li v-for="menu in menuList">
                                <router-link :to='menu.path'>
                                    <span>{{menu.name}}</span>
                                    <i class="iconfont icon-jiantou-right right"></i>
                                </router-link>                                
                            </li>
                        </ul>                    
                    </nav>                
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
    import '../../assets/sidebar.css'
    export default {
        data() {
            return {
                menuList: [
                    {
                        name: '首页',
                        path: '/home',
                        title: '卖座电影'
                    },
                    {
                        name: '影片',
                        path: '/film/now-playing',
                        title: '卖座电影'
                    },
                    {
                        name: '影院',
                        path: '/cinema',
                        title: '全部电影'
                    },
                    {
                        name: '商城',
                        path: '/shop',
                        title: '卖座商城'
                    },
                    {
                        name: '演出',
                        path: '/ticket',
                        title: '卖座·HOPPA演出'
                    },
                    {
                        name: '我的',
                        path: '/login',
                        title: '登录'
                    },
                    {
                        name: '卖座卡',
                        path: '/card/query',
                        title: '查询/绑定/激活卖座卡'
                    }                                                                                                                       
                ]
            }
        },
        computed: {
            show() {
                return this.$store.getters.leftNavState
            }
        },
        methods: {
            hideNav() {
                this.$store.dispatch('changeLeftNavState', false);
            }
        }
    }
</script>