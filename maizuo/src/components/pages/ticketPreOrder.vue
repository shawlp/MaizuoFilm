<template>
    <div id="ticket-preorder">
        <div class="application-view">
            <div class="header-wrap with-navbar clear-mb">
                <div class="step-wrap">
                    <i class="step step-1">
                        <span>详情</span>
                    </i>
                    <i class="step">
                        <span>下单</span>
                    </i> 
                    <i class="step step-3  active">
                        <span>支付</span>
                    </i>                                       
                </div>
                <svg class="step-line" xmlns="http://www.w3.org/2000/svg" width="267" height="13" viewBox="0 0 267 13"><g fill="none" fill-rule="evenodd"><circle cx="5" cy="5" r="5" fill="#FFF" stroke="#000" opacity=".26" transform="translate(131 1)"></circle><g opacity=".26"><path stroke="#979797" stroke-dasharray="1" stroke-linecap="square" d="M135 5.5H9M261 5.5H135"></path><circle cx="6" cy="6" r="6" fill="#000"></circle></g><circle cx="136" cy="6" r="6" fill="#BDBDBD"></circle><circle cx="260" cy="6" r="6" fill="#FF5000"></circle></g></svg>                 
            </div>
            <div>
                <section class="application-main">
                    <article class="preorder-detail-view">
                        <div class="information">
                            <img :src="ticket.img">
                            <div class="information-right">
                                <p class="name">{{ticket.name}}</p>
                                <p class="time1">{{ticket.time | getTime}}</p>
                                <p class="addr">{{ticket.address | getAddress}}</p>
                                <div class="sum">
                                    <p class="count">
                                        × {{ticket.num}}
                                    </p>
                                    <div class="total">¥ {{ticket.total.toFixed(2)}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="address">
                            <div class="not-filled">未填写邮寄信息</div>
                            <i class="iconfont icon-jiantou-right right"></i>                            
                        </div>
                        <div class="summation">
                            <p>
                                <span>订单总额</span>
                                <span class="sp">¥ {{ticket.total.toFixed(2)}}</span>
                            </p>
                            <p>
                                <span>运费</span>
                                <span class="sp">¥ 0.00</span>
                            </p>
                            <p>
                                <span>优惠抵扣</span>
                                <span class="redeem-value">－¥ 0.00</span>
                            </p>                                                        
                        </div>
                        <div class="operation1">
                            <div class="value">
                                <span style="color:#333;font-size:0.28rem">待付金额:</span>
                                <span>¥ {{ticket.total.toFixed(2)}}</span>
                            </div>
                            <router-link to="/login">
                                <div class="primary-button">去支付</div>
                            </router-link>                            
                        </div>
                    </article>
                </section>
            </div>            
        </div>
    </div>
</template>

<script>
    import '../../assets/ticketPreOrder.css'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                ticket: {}
            }
        },
        created() {
            console.log(this.$route.params.id);
            console.log(this.$route.params.ticket);
            this.ticket = this.$route.params.ticket;           
        },
        filters: {
            getAddress(item) {
                let arr = item.split('|');
                return arr[1];
            },
            getTime(item) {
                let timeArr = item.join('').split(' ');
                let time1 = timeArr[0].replace(/-/g, '.');
                let time2 = timeArr[1];

                return time1 + ' ' + time2;
            }
        }
    }
</script>

