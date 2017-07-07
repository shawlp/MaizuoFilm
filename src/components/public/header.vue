<template>
    <div id="header">
        <div class="header-left" @click="showNav">
            <div class="icon-container">
                <i class="iconfont icon-menu"></i>
            </div>
            <div class="toolbar-title">{{title}}</div>
        </div>
        <div class="header-right">
            <a class="city">
                <router-link :to="{ name: 'city'}">
                    <span class="city-content">{{city}}</span>
                </router-link>
                <i class="iconfont icon-jiantou-down"></i>
            </a>

            <router-link :to="{ name: 'login'}" class="user">
                <i class="iconfont icon-wode"></i>                
            </router-link>
        </div>
    </div>
</template>

<script>
    import '../../assets/header.css'
    export default {
        data() {
            return {}
        },
        props: ['title', 'city'],
        computed: {
            show() {
                return this.$store.getters.leftNavState
            }
        },
        methods: {
            showNav() {
                if(!this.show){
                    this.$store.dispatch('changeLeftNavState', true);
                } else {
                    this.$store.dispatch('changeLeftNavState', false);
                }
            }
        }
    }
</script>



