<template>
    <div id="film">
        <div class="film-list-wrap">
            <div class="tabs">
                <div class="tabs-item" @click="changeTab('now-playing')" :class="type == 'now-playing' ? 'active' : ''">正在热映</div>
                <div class="tabs-item" @click="changeTab('coming-soon')" :class="type == 'coming-soon' ? 'active' : ''">即将上映</div>            
            </div>
            <div class="tab-content">
                <transition-group tag="div" name="list-complete" class="now-playing-list" v-if="type == 'now-playing'"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="30">
                    <router-link v-for="item in nowList" :key="item" :to="{ name: 'detail', params: { id: item.id, title: item.name }}">
                        <div class="avater">
                            <img :src="item.poster.thumbnail" alt="" />
                        </div>
                        <div class="info">
                            <div class="inf">
                                <h3>{{item.name}}</h3>
                                <div class="count">{{item.grade}}</div>
                                <i class="iconfont icon-jiantou-right right1"></i>
                            </div>
                            <p>{{item.intro}}</p>
                            <p>
                                <span>{{item.cinemaCount}}</span>家影院上映
                                <span>{{item.watchCount}}</span>人购票
                            </p>
                        </div>
                    </router-link>
                </transition-group>
                <transition-group tag="div" name="list-complete" class="coming-soon-list" v-if="type == 'coming-soon'"
                    v-infinite-scroll="loadMore1"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="50"
                    infinite-scroll-immediate-check="false">
                    <router-link v-for="item in comingList" :key="item" :to="{ name: 'detail', params: { id: item.id, title: item.name }}">
                        <div class="avater">
                            <img :src="item.poster.thumbnail" alt="" />
                        </div>
                        <div class="info">
                            <div class="inf">
                                <h3>{{item.name}}</h3>
                                <div class="count"></div>
                                <i class="iconfont icon-jiantou-right right1"></i>
                            </div>
                            <p>{{item.intro}}</p>
                            <p>
                                <span class='time'>{{item.premiereAt|formatDate}}</span>
                            </p>
                        </div>
                    </router-link>
                </transition-group>                         
            </div>
        </div>
        <!--{{comingList}}    -->
    </div>
</template>

<script>
    import '../../assets/film.css'
    import {mapGetters} from 'vuex'
    import { InfiniteScroll } from 'mint-ui';
    import Vue from 'vue'

    Vue.use(InfiniteScroll);

    export default {
        data() {
            return {
                type: '',
                page1: 0 ,
                page2: 0
            }
        },
        created() {
            document.body.scrollTop = 0;
            this.type = this.$route.params.type;
            console.log(this.type);
            this.$store.dispatch('changeTitle', "卖座电影");
            if(this.type == 'now-playing' && this.nowList.length == 0) {
                this.$store.dispatch('getNowPlayList'); 
            } else if (this.type == 'coming-soon' && this.nowList.length == 0) {
                this.$store.dispatch('getComingList');
            }
          
        },
        computed:mapGetters({
            nowList: 'getNowPlayList',
            comingList: 'getComingList'                     
        }),
		filters:{
			formatDate:function(time){
				let date = new Date(time*1),
					month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
					day = date.getDate()  > 9 ? date.getDate()  : '0' + date.getDate(),
					week = date.getDay();
				
				let arr = ['日','一','二','三','四','五','六']
				
				return `${month}月${day}日上映 星期${arr[week]}`
			}
		},
        methods: {
            changeTab(type) {
                if (this.type == type) {
                    return false;
                }
                this.type = type;
                this.$router.replace({params:{type:type}});
                if(this.type == 'now-playing' && this.nowList.length == 0) {
                    this.$store.dispatch('getNowPlayList'); 
                } else if (this.type == 'coming-soon' && this.comingList.length == 0) {
                    console.log('123');
                    this.$store.dispatch('getComingList');
                }                
            },
            loadMore() {
                console.log('加载更多...');
                this.page1++;
                this.$store.dispatch('getMoreNowPlayList', this.page1);                            
            },
            loadMore1() {
                console.log('加载更多...');
                this.page2++;
                this.$store.dispatch('getMoreComingList', this.page2);                
            }    
        }        
    }
</script>

