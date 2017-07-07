<template>
    <div id="cinema-detail"  v-if="cinema !== null">
        <div class="img-container">
            <img src="../../assets/img/cinema.png" />
        </div>
        <div class="detail-box">
            <div class="box-wrap">
                <div class="img pull-left">
                    <i class="iconfont icon-piao1"></i>
                </div>
                <div class="box">
                    <h3>订座票</h3>
                    <span>选好场次及座位，到影院自助机取票</span>
                    <button class="btn-default seat-btn">立即订座</button>
                </div>
            </div>
        </div>
         <div class="detail-box">
            <div class="box-wrap">
                <div class="img pull-left">
                    <i class="iconfont icon-piao"></i>
                </div>
                <div class="box">
                    <h3>通兑票</h3>
                    <span>有效期内到影院前台兑换影票</span>
                    <button class="btn-default order-btn">立即订票</button>
                </div>
            </div>
        </div>
        <div class="detail-box">
            <div class="box-wrap">
                <div class="img pull-left">
                    <i class="iconfont icon-youhui"></i>
                </div>
                <div class="box">
                    <h3>小卖品</h3>
                    <button class="btn-default seat-btn">购买</button>
                </div>
            </div>
        </div>
        <div class="detail-box">
            <div class="box-wrap">
                <div class="img pull-left">
                    <i class="iconfont icon-dingwei"></i>
                </div>
                <div class="box">
                    <h4>{{cinema.address}}</h4>
                </div>
            </div>
        </div> 
        <div class="detail-box">
            <div class="box-wrap">
                <div class="img pull-left">
                    <i class="iconfont icon-dianhua-copy"></i>
                </div>
                <div class="box">
                    <h4>{{cinema.telephones|getTel}}</h4>
                </div>
            </div>
        </div>
        <div class="other-detail-box">
            <ul class="list-inline">
                <li class="col-xs-2" @click="changeTab(1)" :class="type == 1 ? 'active' : ''">
                    <div class="li-wrap">
                        <i class="iconfont icon-piaol"></i>
                        <span>取票</span>
                    </div>
                </li>                
                <li class="col-xs-2" @click="changeTab(3)" :class="type == 3 ? 'active' : ''">
                    <div class="li-wrap">
                        <i class="iconfont icon-3d"></i>
                        <span>3d</span>
                    </div>
                </li>
                <li class="col-xs-2" @click="changeTab(2)" :class="type == 2 ? 'active' : ''">
                    <div class="li-wrap">
                        <i class="iconfont icon-park"></i>
                        <span>停车</span>
                    </div>
                </li>
                <li class="col-xs-2" @click="changeTab(4)" :class="type == 4 ? 'active' : ''">
                    <div class="li-wrap">
                        <i class="iconfont icon-youhui1"></i>
                        <span>优惠</span>
                    </div>
                </li>
                <li class="col-xs-2" @click="changeTab(5)" :class="type == 5 ? 'active' : ''">
                    <div class="li-wrap">
                        <i class="iconfont icon-jiaotong"></i>
                        <span>交通</span>
                    </div>
                </li>
                <div class="clear"></div>                                                                
            </ul>
            <div class="li-box">
                <!--<p v-for="(item,index) in cinema.services" v-if="type == item.type">{{item.description}}</p>-->
                <p>{{desc}}</p>
            </div>
        </div>                                        
    </div>
</template>

<script>
    import '../../assets/cinemadetail.css'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                type: 1,
                desc: '暂无信息'
            }
        },
        created() {
                this.$watch('cinema', function() {
                    if (this.cinema) {
                        this.cinema.services.map((item, index) => {
                            if (this.type == item.type) {
                                this.desc = item.description;
                            }           
                        })                        
                    }
                })
                document.body.scrollTop = 0;

                let id = this.$route.params.id;
                let title = this.$route.params.title;

                this.$store.dispatch('getCinemaDetail', id);
                this.$store.dispatch('changeTitle', title);

        },
        computed: {...mapGetters({
            cinema: 'getCinemaDetail'
            })
        },
        filters: {
            getTel(items) {
                let str = '';
                items.map((item, index) => {
                    if (index !== items.length - 1) {
                        str += item + '/'
                    } else {
                        str += item
                    }                    
                })
                return str;
            }
        },
        methods: {
            changeTab(type) {
                console.log('type:'+type);
                this.type = type;

                let isExist = false;
                let str = '';

                this.cinema.services.map((item, index) => {
                    if (type == item.type) {
                        if (type == 5) {
                            str += item.description;
                        } else {
                            this.desc = item.description;
                        }
                        isExist = true;
                    } else if (type == 5) {  
                        if (item.type == 6) {
                            str += item.description;
                            this.desc = str;
                            isExist = true;
                        }
                    }

                    if (str !== '') {
                        this.desc = str;  
                    }
                  
                });

                if (!isExist) {
                    this.desc = '暂无信息';
                }


            }
        }
    }
</script>

