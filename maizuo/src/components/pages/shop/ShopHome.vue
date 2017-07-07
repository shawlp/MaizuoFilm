<template>
    <div id="shop-home">
        <div class="banner">
            <swiper class="banner-swiper" :options="swiperOption">
                <swiper-slide v-for="(item,index) in banner" :key="index">
                    <router-link :to="'/act/active/'+ item.url.replace('http://m.maizuo.com/act/active/','')">
                        <img :src="item.imageSrc" alt=""/>
                    </router-link>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>              
            </swiper>            
        </div>
        <ul class="shops clearfix">
            <li class="shop" v-for="(item, index) in categories" :class="(index + 1) % 4 == 0 ? 'no-right-border' : ''">
                <router-link :to="'/shop/category/'+ item.url.replace('http://aura.maizuo.com/?showwxpaytitle=1#/category/','')">
                    <img :src="item.imageSrc" :alt="item.name">                    
                </router-link>
                <div class="category-name">{{item.name}}</div>
            </li>                                     
        </ul>
        <div class="active">
            <div>
                <div class="line"></div>
                <div class="active-contain">
                    <div class="active-center clearfix">
                        <div class="active-left" v-for="(item, index) in advices" :class="index == 0 ? 'rt' : 'lt'">
                            <router-link :to="'/activelist/'+ item.url.replace('http://aura.maizuo.com/?showwxpaytitle=1#/active/','')">
                                <div class="active-left-content">
                                    <img :src="item.imageSrc" alt="">                                
                                </div>
                            </router-link>
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
        <div class="price active">
            <div class="line"></div>
            <div class="active-title">— 有品专区 —</div>
            <div class="active-contain">
                <div class="active-center clearfix">
                    <div class="active-left">
                        <router-link :to="'/act/active/'+ specials[0].url.replace('http://m.maizuo.com/act/active/','')">                        
                            <div class="price-left-content rt">
                                <img :src="specials[0].imageSrc" alt="">
                            </div>
                        </router-link>
                    </div>
                    <div class="active-left">
                        <div class="price-left-content lt">
                            <router-link :to="'/shop/item/'+ specials[1].url.replace('http://aura.maizuo.com/?showwxpaytitle=1#/item/','')">                                                            
                                <div class="top">
                                    <img :src="specials[1].imageSrc" alt="">                                
                                </div>
                            </router-link>
                            <router-link :to="'/shop/item/'+ specials[2].url.replace('http://aura.maizuo.com/?showwxpaytitle=1#/item/','')">                                                                                        
                                <div class="bottom">
                                    <img :src="specials[2].imageSrc" alt="">                                                                
                                </div>
                            </router-link>
                        </div>                        
                    </div>                    
                </div>
            </div>            
        </div>
        <div class="subject">
            <div v-for="(item1, index1) in themes">
                <div class="line"></div>
                <div class="subject-center">
                    <router-link :to="'/activelist/'+ item1.url.replace('http://aura.maizuo.com/?showwxpaytitle=1#/active/','')">                    
                        <div>
                            <img :src="item1.imageSrc" alt="">
                        </div>
                    </router-link>
                    <div class="pic-list">
                        <swiper :options="swiperOption2">
                            <swiper-slide class="pic-swipe" v-for="(item2, index1) in item1.products" :key="index1">
                                <router-link :to="'/shop/item/'+ item2.id">                                                                                                
                                    <div class="control-list">
                                        <div class="pic-area">
                                            <div class="control-pic">
                                                <img :src="item2.image">                                            
                                            </div>
                                        </div>
                                        <p class="control-name">{{item2.name}}</p>
                                        <p class="control-price">￥{{(item2.price / 100).toFixed(2)}}</p>    
                                    </div>
                                </router-link>
                            </swiper-slide>

                            <swiper-slide class="pic-swipe">
                                <router-link :to="'/activelist/'+ item1.url.replace('http://aura.maizuo.com/?showwxpaytitle=1#/active/','')">                                                   
                                    <span class="pic-list-right">
                                        全部
                                    </span>
                                </router-link>              
                            </swiper-slide>                                                                                                                
                        </swiper>                        
                    </div>                    
                </div>
            </div>
        </div>
        <div 
            class="recommend" style="margin-top: 0.2rem" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="50" 
            infinite-scroll-immediate-check="false">
            <div class="container">
                <div class="title" style="text-align:center;">—&nbsp;好货精选&nbsp;—</div>                
                <div class="items">
                    <div class="tailloader clearfix">
                        <router-link v-for="(item, index) in recommendList" :key="index" :to="'/shop/item/'+ item.id">                                                                                                                        
                            <div class="item1" :class="index % 2 == 0 ? 'even' : 'odd'">
                                <a href="#">
                                    <div class="logo">
                                        <img :src="item.skuList[0].image">
                                        <div class="name">{{item.masterName}}</div>
                                        <div class="content">
                                            <span class="price">￥{{(item.skuList[0].price / 100).toFixed(2)}}</span>
                                            <span class="inventory">
                                                已售{{item.displaySalesCount}}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </router-link>
                    </div>
                    <div class="tips" v-if="hasMoreData === false">~貌似没有更多了~</div>
                </div>
            </div>
        </div>                        
    </div>
</template>

<script>
    import '../../../assets/shopHome.css'
    import {mapGetters} from 'vuex'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { InfiniteScroll } from 'mint-ui';
    import Vue from 'vue'

    Vue.use(InfiniteScroll);

    export default {
        data() {
            return {
                swiperOption: {
                    loop : true,
                    autoplay: 3000,
                    autoHeight: true,
                    pagination : '.swiper-pagination'
                },
                swiperOption2: {
                    autoHeight: true
                },
                page: 1                
            }
        },
        computed:mapGetters({
            banner: 'getBanner',
            categories: 'getCategories',
            advices: 'getAdvices',
            specials: 'getSpecials',
            themes: 'getThemes',
            recommendList: 'getRecommendList',
            hasMoreData: 'hasMoreData'             
        }),
        created() {
            this.$store.dispatch('changeTitle', "卖座商城");

            this.$store.dispatch('getShopList');
            this.$store.dispatch('getRecommendList', {page: this.page});            
        },
        components: {
            swiper,
            swiperSlide        
        },
        methods: {
            loadMore() {
                console.log('加载更多...');
                this.page++;
                this.$store.dispatch('getMoreRecommendList', {page: this.page});                            
            }
        }       
    }
</script>
