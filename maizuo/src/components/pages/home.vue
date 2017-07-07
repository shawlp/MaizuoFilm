<template>
    <div id="home">
        <div class="banner">
            <swiper class="banner-swiper" :options="swiperOption">
                <swiper-slide v-for="(item,index) in banner" :key="index">
                    <a target='_blank' :href="item.url">
                        <img :src="item.imageUrl" alt=""/>
                    </a>
                </swiper-slide>              
            </swiper>
        </div>
        <div class="now-playing">
            <div class="item" v-for="(item, index) in nowplay">
                <router-link :to="{ name: 'detail', params: { id: item.id, title: item.name }}">
                    <img :src="item.cover.origin" />
                    <div class="desc">
                        <div class="info">
                            <h4>{{item.name}}</h4>
                            <p>{{item.cinemaCount}}家影院上映 {{item.watchCount}}人购票</p>
                        </div>
                        <div class="grade">
                            {{item.grade}}
                        </div>
                    </div>
                </router-link>    
            </div>
            <router-link :to="{ name: 'film', params: { type: 'now-playing' }}" class="go-more">
                    更多热映电影            
            </router-link>                 
        </div>
        <div class="coming-soon">
            <div class="item" v-for="item in coming">
                <router-link :to="{ name: 'detail', params: { id: item.id, title: item.name }}">
                    <img :src="item.cover.origin" />
                    <div class="desc1">
                        <div class="info">
                            <h4>{{item.name}}</h4>
                        </div>
                        <div class="time">
                            {{item.premiereAt|formatDate}}
                        </div>
                    </div>
                </router-link>
            </div>        
            <router-link :to="{ name: 'film', params: { type: 'coming-soon' }}" class="go-more">
                更多即将上映电影            
            </router-link>                                
        </div>
    </div>
</template>


<script>
    import '../../assets/home.css'
    import {mapGetters} from 'vuex'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        data() {
            return {
                swiperOption: {
                    loop : true,
                    autoplay: 3000,
                    autoHeight: true
                }
            }
        },
        created() {
            document.body.scrollTop = 0;
            this.$store.dispatch('changeTitle', "卖座电影");
            if (this.banner.length == 0) {
                this.$store.dispatch('getBannerList');
            }
            if (this.nowplay.length == 0) {
                this.$store.dispatch('getNowPlaying');
            }
            if (this.coming.length == 0) {
                this.$store.dispatch('getComingSoon');              
            }
        },
        computed: mapGetters({
            banner: 'getBannerList',
            nowplay: 'getNowPlaying',
            coming: 'getComingSoon'
        }),
        filters: {
            formatDate(item) {
                let date = new Date(item*1),
					month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
					day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
				
				return `${month}月${day}日上映`
            }
        },
        components: {
            swiper,
            swiperSlide        
        }    
    }
</script>
