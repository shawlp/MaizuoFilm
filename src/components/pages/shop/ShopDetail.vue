<template>
    <div id="shop-detail">
        <div class="item-shop">
            <div class="item-detail">
                <div class="item-body">
                    <div class="carousel">
                        <swiper class="banner-swiper" :options="swiperOption">
                            <!--<swiper-slide v-for="(item,index) in banner" :key="index">
                                <router-link :to="'/act/active/'+ item.url.replace('http://m.maizuo.com/act/active/','')">
                                    <img :src="item.imageSrc" alt=""/>
                                </router-link>
                            </swiper-slide>-->
                            <swiper-slide v-for="(item,index) in shopdetail.skuList[0].images" :key="index">
                                <img :src="item" alt=""/>
                            </swiper-slide>                                                                          
                            <div class="swiper-pagination"  slot="pagination"></div>              
                        </swiper>
                        
                    </div>
                    <div class="item-info">
                        <div class="name">
                            {{shopdetail.masterName}}
                        </div>
                        <div class="subname">{{shopdetail.slaveName}}</div>
                        <div class="price">￥{{(shopdetail.skuList[0].price / 100).toFixed(2)}}</div>
                        <div class="tips clearfix">
                            <div class="express-fee">快递：0.00 元</div>
                            <div class="sold-amount">
                                销量：{{shopdetail.displaySalesCount}}
                            </div>
                            <div class="location">
                                全国
                            </div>
                        </div>                        
                    </div>
                    <div class="sku-pick" @click="show" v-if="shopdetail.options.length !== 0">
                        <span v-if="shopdetail.options[0].item.length == 1">已选择: {{shopdetail.options[0].item[0]}} x 1</span>                                                
                        <span v-if="shopdetail.options[0].item.length > 1">选择 规格 数量</span>
                        <i class="iconfont icon-jiantou-right right"></i>                            
                    </div>
                    <div class="sku-pick" @click="show" v-if="shopdetail.options.length == 0">
                        <span>x 1</span>
                        <i class="iconfont icon-jiantou-right right"></i>                            
                    </div>                    
                    <!-- sku-box-hide-->
                    <div class="sku-box" :class="isShow == false ? 'sku-box-hide' : ''">
                        <div class="box-body">
                            <div class="box-sku-info">
                                <div class="box-sku-head clearfix">
                                    <div class="sku-pic">
                                        <img :src="shopdetail.skuList[0].images[0] +'?x-oss-process=image/resize,m_fill,h_100,w_100'" alt="initSku.name">
                                    </div>
                                    <div class="sku-context">
                                        <div class="price">￥{{(shopdetail.skuList[0].price / 100).toFixed(2)}}</div>
                                        <div class="name">选择 规格 数量</div>                                        
                                    </div>
                                    <div @click="hide">
                                        <i class="iconfont icon-close"></i>
                                    </div>
                                </div>    
                            </div>
                            <div class="sku-select">
                                <div class="box-sku-list" v-if="shopdetail.options[0]!== undefined">
                                    <div class="option-name" >{{shopdetail.options[0].name}}</div>
                                    <div class="option-list">
                                        <span v-for="(item, index) in shopdetail.options[0].item" :class="index == activeIndex ? 'pick' : ''" @click="select(index)">{{item}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="box-count">
                                <div class="count-title">选择数量</div>
                                <div class="count-body">
                                    <div class="count-type">
                                        <span class="icon left" :class="num == 1 ? 'disable' : ''" @click="reduce">-</span>
                                        <span class="center">{{num}}</span>
                                        <span class="count-no-border icon right" @click="add">+</span>
                                    </div>
                                </div>
                            </div>
                            <div class="box-bottom"></div>                                                      
                        </div>
                    </div>
                    <div class="item-bottom">
                        <div class="item-footer-left item-footer-button">
                            <div class="item-footer-home item-footer-icon">
                                <i class="iconfont icon-home "></i>
                                <div class="foot-icon-text">首页</div>
                            </div>
                        </div>
                        <router-link :to="{ name: 'shopPreOrder', params: {id: shopdetail.id, ShopOrder: {id: shopdetail.id, img: shopdetail.skuList[0].images[0], name: shopdetail.masterName, price: this.shopdetail.skuList[0].price / 100, num, total, selectItem}}}">                                  
                            <div class="item-footer-right item-footer-act">立即购买</div>
                        </router-link>
                    </div>
                    <div class="toast toast-disable" style="display: none">
                        <div class="toast-context context-disable">请选择规格数量</div>
                    </div>                                                                                                   
                </div>
            </div>
            <div class="desc desc-show">
                <div class="desc-wrap">
                    <div v-html="shopdesc"></div>
                </div>
            </div>
            <div class="empty-bottom"></div>
        </div>
                      
    </div>
</template>

<script>
    import '../../../assets/shopDetail.css'
    import {mapGetters} from 'vuex'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        data() {
            return {
                swiperOption: {
                    loop : true,
                    autoplay: 3000,
                    autoHeight: true,
                    pagination : '.swiper-pagination'
                },
                isShow: false,
                activeIndex: 0,
                num: 1,
                total: 0,
                selectItem: ''             
            }
        },
        computed:mapGetters({
            shopdesc: 'getShopDesc',
            shopdetail: 'getShopDetail'           
        }),
        created() {
            this.$watch('shopdetail', function() {
                this.total = this.shopdetail.skuList[0].price / 100 * this.num;

                if (this.shopdetail.options[0].item.length == 1) {
                    this.selectItem = this.shopdetail.options[0].item[0];                    
                }
            })
            document.body.scrollTop = 0;
            let id = this.$route.params.id;
            this.$store.dispatch('changeTitle', "卖座商城");

            this.$store.dispatch('getShopDesc', id);
            this.$store.dispatch('getShopDetail', id);            
        },
        components: {
            swiper,
            swiperSlide        
        },
        methods: {
            show() {
                this.isShow = true;
            },
            hide() {
                this.isShow = false;
            },
            select(index) {
                console.log(this.shopdetail.options[0].item[index]);
                this.activeIndex = index;
                this.selectItem = this.shopdetail.options[0].item[index];
            },
            add() {
                this.num++;
                this.total = this.shopdetail.skuList[0].price / 100 * this.num;
            },
            reduce() {
                if (this.num == 1) {
                    return false;
                }
                this.num--;
                this.total = this.shopdetail.skuList[0].price / 100 * this.num;
            }
        }       
    }
</script>
