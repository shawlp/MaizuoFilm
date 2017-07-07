<template>
    <div id="ticket">
        <section class="application-main">
            <article>
                <div class="tailloader">
                    <div class="schedule-list-view"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="loading"
                         infinite-scroll-distance="50"
                         infinite-scroll-immediate-check="false">
                        <ul>
                            <li class="schedule-item" v-for="(ticket, index) in ticketlist" :class="index == 0 ? 'first-child' : ''">
                                <!--<router-link :to="{ name: 'ticketById', params: { id: ticket.id}}">-->
                                <router-link :to="'/ticket/'+ ticket.id">                                    
                                    <div class="image-wrap">
                                        <img :src="ticket.skuList[0].image">
                                    </div>
                                    <p>{{ticket.masterName}}</p>
                                </router-link>
                            </li>
                            <!--<li class="schedule-item">
                                <div class="image-wrap">
                                    <img src="http://mall.s.maizuo.com/7b38dae44b047f5e1dda3b0400124974.jpg">
                                </div>
                                <p>【深圳】2017王心凌Cyndi Wants!世界巡回演唱会</p>
                                <div class="coupon"> 
                                    <div class="coupon-home first-child">
                                        ¥ 20
                                        <span class="limit">适用于480票面</span>
                                    </div>
                                    <div class="coupon-home">
                                        ¥ 20
                                        <span class="limit">适用于480票面</span>
                                    </div>
                                    <div class="coupon-home">
                                        ¥ 20
                                        <span class="limit">适用于480票面</span>
                                    </div>
                                    <div class="more">
                                        <i class="iconfont icon-more"></i>
                                    </div>                                                                          
                                </div>
                            </li>-->
                        </ul>
                        <p class="tip" v-if="moredata == false">已经到底了</p>
                    </div>
                </div>
            </article>            
        </section>        
        <!--{{ticketlist}}-->
    </div>
</template>

<script>
    import '../../assets/ticket.css'
    import {mapGetters} from 'vuex'
    import { InfiniteScroll } from 'mint-ui';
    import Vue from 'vue'

    Vue.use(InfiniteScroll);    

    export default {
        data() {
            return {
                pageNo: 1
            }
        },
        created() {
            this.$store.dispatch('changeTitle', "卖座·HOPPA演出");
            this.$store.dispatch('getTicketList', this.pageNo)          
        },
        computed:mapGetters({
            ticketlist: 'getTicketList',
            moredata: 'isMore'
        }),
        methods: {
            loadMore() {
                console.log('加载更多...');
                this.pageNo++;
                this.$store.dispatch('getMoreTicketList', this.pageNo);                            
            }
        }
    }
</script>

