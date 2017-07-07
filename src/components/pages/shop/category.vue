<template>
    <div id="shop-category">
        <div class="detail">
            <img :src="category.image" alt="">
            <p class="name">{{category.name}}</p>
        </div>
        <div class="recommend"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="50"
            infinite-scroll-immediate-check="false">
            <div class="container">
                <div class="items">
                    <div class="tailloader clearfix">
                        <router-link v-for="(item, index) in itemList" :key="index" :to="'/shop/item/'+ item.id">                                                                                                                        
                            <div class="item1"  :class="index % 2 == 0 ? 'even' : 'odd'">
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
                    <!--<div class="tips" v-if="hasMoreData === true">~加载更多~</div>-->
                    <div class="tips" v-if="hasMoreData === false">~貌似没有更多了~</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../assets/category.css'
    import {mapGetters} from 'vuex'
    import { InfiniteScroll } from 'mint-ui';
    import Vue from 'vue'

    Vue.use(InfiniteScroll);

    export default {
        data() {
            return {
                page: 1
            }
        },
        computed:mapGetters({
            category: 'getCategory',
            itemList: 'getItemList',
            hasMoreData: 'isMoreData'
        }),
        created() {
            let id = this.$route.params.id;
            this.$store.dispatch('changeTitle', "卖座商城");
            this.$store.dispatch('getCategory', id );            
            this.$store.dispatch('getItemList', { id });
        },
        methods: {
            loadMore() {
                console.log('加载更多...');
                this.page++;
                this.$store.dispatch('getMoreItemList', {id: this.$route.params.id, page: this.page});                            
            }
        } 
    }
</script>

