<template>
    <div id="ticket-tocreate">
        <div class="application-view">
            <div class="header-wrap with-navbar clear-mb">
                <div class="step-wrap">
                    <i class="step step-1">
                        <span>详情</span>
                    </i>
                    <i class="step active">
                        <span>下单</span>
                    </i> 
                    <i class="step step-3">
                        <span>支付</span>
                    </i>                                       
                </div>
                <svg class="step-line" xmlns="http://www.w3.org/2000/svg" width="267" height="13" viewBox="0 0 267 13"><g fill="none" fill-rule="evenodd"><g opacity=".26"><g transform="translate(135 2)"><path stroke="#979797" stroke-dasharray="1,4,1,4" stroke-linecap="square" d="M126 4.5H0"></path><circle cx="126" cy="5" r="5" fill="#FFF" stroke="#000"></circle></g><path stroke="#979797" stroke-dasharray="1" stroke-linecap="square" d="M135 6.5H9"></path><circle cx="6" cy="6" r="6" fill="#000"></circle></g><circle cx="136" cy="6" r="6" fill="#FF5000"></circle></g></svg>
            </div>
            <div class="app">
                <section class="application-main">
                    <div class="schedule-detail-view">
                        <div class="sku-wrap">
                            <article>
                                <p>时间:</p>
                                <ul class="date-list">
                                    <li class="date-item active">
                                        <span class="date">{{ticket.options[0].item | getDate}}</span>
                                        <span class="time1">{{ticket.options[0].item | getTime }}</span>                                        
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p>票档:</p>
                                <ul class="price-list">
                                    <li class="price-item" v-for="(item, index) in ticket.options[1].item" :class="index === activeIndex ? 'active' : ''">
                                        <div :id="item | getPrice" @click="select(index)">
                                            <span class="price">{{item | getPrice}}</span>
                                            <span>{{item}}</span> 
                                        </div>                                       
                                    </li>                                                                                                         
                                </ul>
                            </article>
                            <article>
                                <p>数量</p>
                                <div class="counter-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="26" viewBox="0 0 70 52" @click="reduce">
                                        <g fill="none" fill-rule="evenodd">
                                            <path :stroke="num === 2 ? '#ff5000' : '#bcbcbc'" d="M.5.5h69v51H.5z"></path>
                                            <path :fill="num === 2 ? '#ff5000' : '#bcbcbc'" d="M21.667 23.4h26v5.2h-26z"></path>
                                        </g>
                                    </svg>
                                    <div class="count">{{num}}</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="26" viewBox="0 0 70 52" @click="add">
                                        <g fill="none" fill-rule="evenodd">
                                            <path :stroke="num === 1 ? '#ff5000' : '#bcbcbc'" d="M.5.5h69v51H.5z"></path>
                                            <path :fill="num === 1 ? '#ff5000' : '#bcbcbc'" d="M32.733 23.4h-10.4v5.2h10.4V39h5.2V28.6h10.4v-5.2h-10.4V13h-5.2v10.4z"></path>
                                         </g>
                                    </svg>
                                </div>                                
                            </article>                            
                        </div>
                        <div class="operation1">
                            <div class="value">
                                <span style="color:#333;font-size:0.28rem">待付金额:</span>
                                <span>¥ {{total.toFixed(2)}}</span>
                            </div>
                            <!--<router-link :to="'/ticket/'+ ticket.id + '/preorder'"> -->
                            <router-link :to="{ name: 'ticketPreOrder', params: { id: ticket.id, ticket: {id: ticket.id, img: ticket.skuList[0].images[1], name: ticket.masterName, time: ticket.options[0].item, address: ticket.slaveName, num, total}}}">                                  
                                <div class="primary-button">立即下单</div>
                            </router-link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/ticketToCreate.css'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                activeIndex: 0,
                num: 1,
                total: 0
            }
        },
        created() {
            this.$watch('ticket', function() {
                if (this.ticket) {
                    let it = this.ticket.options[1].item[0];
                    let price = it.replace(/[^0-9]/ig,'');
                    this.total = price * this.num;                    
                }
            });
            let id = this.$route.params.id;
            this.$store.dispatch('getTicketDetail', id);            
        },
        computed:{...mapGetters({
                ticket: 'getTicketDetail'
            })
        },
        filters: {
            getDate(time) {
                let date = new Date(time);
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate();
                return month + '月' + day + '日';
            },
            getTime(time) {
                let date = new Date(time);
                let day = date.getDay();
                let hours = date.getHours();
                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

                switch(day) {
                    case 0:
                        day = '日';
                        break;
                    case 1:
                        day = '一';
                        break;
                    case 2:
                        day = '二';
                        break;
                    case 3:
                        day = '三';
                        break; 
                    case 4:
                        day = '四';
                        break;
                    case 5:
                        day = '五';
                        break;
                    case 6:
                        day = '六';
                        break;                                                                                                                                           
                }
                
                let rtime = hours + ':' + minutes;
                return '周' + day + ' ' + rtime;               
            },
            getPrice(item) {
                return item.replace(/[^0-9]/ig,'');
            }
        },
        methods: {
            select(item) {
                this.activeIndex = item;

                let it = this.ticket.options[1].item[item];
                let price = it.replace(/[^0-9]/ig,'');

                this.total = price * this.num;
            },
            add() {
                if (this.num == 2) {
                    return false;
                }
                this.num = 2;
                let it = this.ticket.options[1].item[this.activeIndex];
                let price = it.replace(/[^0-9]/ig,'');
                this.total = price * this.num;
                
            },
            reduce() {
                if (this.num == 1) {
                    return false;
                }
                this.num = 1;

                let it = this.ticket.options[1].item[this.activeIndex];
                let price = it.replace(/[^0-9]/ig,'');
                this.total = price * this.num;
            }
        }
    }
</script>

