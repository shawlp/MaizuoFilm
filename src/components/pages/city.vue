<template>
    <div id="city">
        <div class="city-view">
            <div class="gprs-city">
                <div class="city-index-title">GPS定位你所在城市</div>
                <div class="city-index-detail">
                    <ul class="list-unstyled">
                        <router-link :to="{ name: 'home'}">
                            <li class="city-item-detail city-item-detail-gprs" @click="changeCity('深圳')">深圳</li>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="hot-city">
                <div class="city-index-title">热门城市</div>
                <div class="city-index-detail">
                    <ul class="list-unstyled">
                        <router-link :to="{ name: 'home'}">
                            <li class="city-item-detail" @click="changeCity('北京')">北京</li>
                        </router-link>
                        <router-link :to="{ name: 'home'}">
                            <li class="city-item-detail" @click="changeCity('上海')">上海</li>
                        </router-link>
                        <router-link :to="{ name: 'home'}">
                            <li class="city-item-detail" @click="changeCity('广州')">广州</li>
                        </router-link>
                        <router-link :to="{ name: 'home'}">                           
                            <li class="city-item-detail" @click="changeCity('深圳')">深圳</li>
                        </router-link>
                    </ul>
                </div>                
            </div>
            <div class="index-city">
                <div>
                    <div class="city-index-title">按字母排序</div>
                    <div class="city-index-detail">
                        <ul class="list-unstyled">
                            <li class="city-item-detail" v-for="(val, key, index) in citylist" v-if="val.length !== 0" @click="goAnchor('#anchor-'+index)">{{key}}</li>
                        </ul>
                    </div>
                </div>
                <div class="index-city-list">
                    <div v-for="(val, key, index) in citylist" v-if="val.length !== 0">
                        <div class="city-index-title" :id="'anchor-'+index">{{key}}</div>
                        <div class="city-index-detail">
                            <ul class="list-unstyled">
                                <router-link :to="{ name: 'home'}" v-for="city in val" :key="city">
                                    <li class="city-item-detail" @click="changeCity(city)">{{city}}</li>
                                </router-link>
                            </ul>
                        </div>                        
                    </div>
                </div>                                
            </div>

        </div>        
        <!--{{citylist}}
        {{letters}}-->
    </div>
</template>

<script>
    import '../../assets/city.css'
    import {mapGetters} from 'vuex'    

    export default {
        created() {
            this.$store.dispatch('changeTitle', "选择城市");
            this.$store.dispatch('getCityList');     
        },
        computed: {
            ...mapGetters({
                citylist: 'getCityList'
            })
        },
        methods: {
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                document.body.scrollTop = anchor.offsetTop;
            },
            changeCity(city) {
                console.log(city);
                this.$store.dispatch('changeCity', city);
            }
        }
    }
</script>

