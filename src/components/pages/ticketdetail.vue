<template>
    <div id="ticket-detail">
        <div class="application-view">
            <div class="header-wrap with-navbar clear-mb">
                <div class="step-wrap">
                    <i class="step step-1 active">
                        <span>详情</span>
                    </i>
                    <i class="step">
                        <span>下单</span>
                    </i> 
                    <i class="step step-3">
                        <span>支付</span>
                    </i>                                       
                </div>
                <svg class="step-line" xmlns="http://www.w3.org/2000/svg" width="267" height="13" viewBox="0 0 267 13">
                    <g fill="none" fill-rule="evenodd">
                        <g opacity=".26" transform="translate(3 2)">
                            <path stroke="#979797" stroke-dasharray="1,4,1,4" stroke-linecap="square" d="M257.5 4.5H.498">
                            </path>
                            <ellipse cx="133" cy="5" fill="#FFF" stroke="#000" rx="5" ry="5"></ellipse>
                            <ellipse cx="258" cy="5" fill="#FFF" stroke="#000" rx="5" ry="5"></ellipse>
                        </g>
                        <ellipse cx="6" cy="6" fill="#FF5000" rx="6" ry="6"></ellipse>
                    </g>
                </svg>
            </div>
            <div>
                <section class="application-main">
                    <article class="schedule-detail-view">
                        <div class="info" v-if="ticket !== null">
                            <img class="info-image" :src="ticket.skuList[0].images[1]">
                            <div class="info-right">
                                <p class="info-name">{{ticket.masterName}}</p>
                                <p class="info-time">{{ticket.slaveName | getTime}}</p>
                                <p class="info-address">{{ticket.slaveName | getAddress}}</p>
                                <div class="info-operation">
                                    <p class="price-range"><span v-if="priceList.length !== 0">{{priceList[0]}} - {{maxPrice}} </span>元</p>
                                    <div v-if="ticket.skuList[0].images[2] !== undefined">
                                        <div class="seat-btn" @click="showPic">座位图</div>
                                        <div class="preview-wrap" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" v-if="isShow" @click="hide">
                                            <img :src="ticket.skuList[0].images[2]" style="transform: translate3d(0px, 0px, 0px) scale(1);">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="coupon">
                            <p class="title">优惠券</p>
                            <div class="coupon1"> 
                                <div class="coupon-home" v-for="(price,index) in priceList" :class="index == 0 ? ' first-child' : ''">
                                    <div v-if="price === 480">¥ 20</div>
                                    <div v-else-if="price === 680">¥ 30</div>
                                    <div v-else-if="price === 880">¥ 40</div>
                                    <div v-else-if="price === 1080">¥ 50</div>
                                    <div v-else="price === 1280">¥ 60</div>                                    
                                    <span class="limit">适用于{{price}}票面</span>
                                </div>                                                                                                       
                            </div>
                            <span class="coupon-btn" @click="getCoupon" :class="isGet == true ? 'unactive' : ''">一键领取</span>
                        </div>
                        <div class="desc">
                            <P class="title">演出详情</P>
                            <div v-html="description">
                                
                            </div>
                            <!--<div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/a5b19adafffcba17d56be9835c925a50.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/e212bb4e4a2a5859c49496473cfc41eb.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/e5ba9f282d011ac1fee4141cefd78ca2.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/08da9eea8a90cbdeb6efe414996a7896.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/6f984dbd5ba67bd90c8b99a42c869ccd.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/e962330d3d20ec67747f621441c459c2.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/51509831f350f951cb7f5406908e39fa.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/879788cf798b72145ea8280142d8e4ce.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/49998fec3848dd8288777d5cfd357f43.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/f718fa42b999604751146f40ca0f4eda.jpg" style="width: 640px;"></div><div style="text-align: center;"><img src="http://mall.s.maizuo.com/38e33556eff4d404e7659c9fc1a7b689.jpg" style="width: 640px;"><br></div></div>-->
                        </div>
                        <div class="primary-button disabled" v-if="isGet === false">先领券再下单</div>
                        <router-link :to="'/ticket/'+ $route.params.id + '/to-create'">
                            <div class="primary-button" v-if="isGet === true" @click="go">下一步</div>
                        </router-link>
                    </article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/ticketdetail.css'
    import {mapGetters} from 'vuex'


    export default {
        data() {
            return {
                "isShow": false,
                isGet: false,
                priceList: [],
                maxPrice: 0
            }
        },
        created() {
            document.body.scrollTop = 0;
            this.$watch('ticket', function(){
                if (this.ticket) {
                    this.ticket.skuList.map((item) => {
                        this.priceList.push(item.marketPrice / 100);
                    });

                    if (this.priceList.length !== 0) {
                        this.priceList.sort((a, b) => {
                            return a > b ? 1 : -1;
                        });
                        let arr = this.priceList;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] == arr[i+1]) {
                                arr.splice(i, 1);
                            }
                        }
                        this.priceList = arr; 
                        this.maxPrice = this.priceList[arr.length - 1]; 
                    }
                }
            });
            let id = this.$route.params.id;
            //console.log(id);
            this.$store.dispatch('getTicketDetail', id);
            this.$store.dispatch('getTicketDescription', id);
        },
        computed:mapGetters({
            ticket: 'getTicketDetail',
            description: 'getTicketDescription'
        }),
        filters: {
            getTime(item) {
                let arr = item.split('|');
                return arr[0];
            },
            getAddress(item) {
                let arr = item.split('|');
                return arr[1];
            }
        },
        methods: {
            showPic() {
                this.isShow = !this.isShow;
            },
            hide() {
                this.isShow = false;
            },
            getCoupon() {
                this.isGet = true;
            },
            go() {

            }
        }
    }
</script>

