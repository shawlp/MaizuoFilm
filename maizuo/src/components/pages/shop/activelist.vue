<template>
    <div class="active-list">
        <div class="detail">
        </div>
        <div class="recommend" 
            style="margin-top: 0.2rem"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="50"
            infinite-scroll-immediate-check="false">
            <div class="container">
                <div class="items">
                    <div class="tailloader clearfix">
                        <router-link v-for="(item, index) in activeList" :key="index" :to="'/shop/item/'+ item.id">                                                                                                                        
                            <div class="item1" :class="index % 2 == 0 ? 'even' : 'odd'">
                                <a href="#">
                                    <div class="logo">
                                        <img :src="item.image">
                                        <div class="name">{{item.name}}</div>
                                        <div class="content">
                                            <span class="price">￥{{(item.price / 100).toFixed(2)}}</span>
                                            <span class="inventory">
                                                已售{{item.salesCount}}{{hasMoreData}}
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
    import '../../../assets/activelist.css'
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
            activeList: 'getActiveList',
            hasMoreData: 'hasMoreData'             
        }),
        created() {
            document.body.scrollTop = 0;
            let id = this.$route.params.id;
            this.$store.dispatch('changeTitle', "卖座商城");
          
            this.$store.dispatch('getActiveList', { id });
        },
        destroyed(){
            console.log('destoryed');
        },
        methods: {
            loadMore() {
                console.log('加载更多...');
                this.page++;
                this.$store.dispatch('getMoreActiveList', {id: this.$route.params.id,page: this.page});                            
            }
        }   
    }
</script>

