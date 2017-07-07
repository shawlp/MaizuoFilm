<template>
    <div id="shop-preorder">
        <div class="preorder">
            <div class="preorder-info clearfix">
                <div class="info clearfix">
                    <div class="left">
                        <img :src="shop.img" alt="商品logo">                        
                    </div>
                    <div class="right">
                        <div class="right-header">
                            <span class="count">x{{shop.num}}</span>
                            <div class="name">{{shop.name}}</div>
                        </div>
                        <div class="spe">{{shop.selectItem}}</div>
                        <div class="price">￥{{shop.price.toFixed(2)}}</div>
                    </div>
                    <div class="info-dash"></div>                    
                </div>
                <div class="address">
                    <div class="no-address">未填写邮寄地址</div>
                    <i class="iconfont icon-jiantou-right right"></i>                            
                </div>
                <div class="redeem">
                    <div class="tab card">
                        <i class="iconfont icon-jiantou-right right"></i>                            
                        <div class="left">
                            <div class="tips">
                                <span class="count">0张可用</span>
                            </div>
                            <div class="name">卖座卡兑换</div>
                        </div>                        
                    </div>
                    <div class="tab coupon">
                        <i class="iconfont icon-jiantou-right right"></i>                            
                        <div class="left">
                            <div class="tips">
                                <span class="count">0张可用</span>
                            </div>
                            <div class="name">现金券</div>
                        </div>
                    </div>
                    <div class="tab balance">
                        <i class="iconfont icon-jiantou-right right"></i> 
                        <div class="left">
                            <div class="tips">￥0.00</div>
                            <div class="name">余额</div>
                        </div>
                    </div>                                       
                </div>
                <div class="expense clearfix">
                    <div class="tab">
                        <div class="right">￥{{shop.total.toFixed(2)}}</div>
                        <div class="left">订单总额</div>
                    </div>
                    <div class="tab">
                        <div class="right">￥ 0</div>
                        <div class="left">运费</div>
                    </div>
                    <div class="tab">
                        <div class="right">-￥0.00</div>
                        <div class="left">优惠抵扣</div>
                    </div>
                </div>                
            </div>
            <div class="topay">
                <router-link to="/login">
                    <div class="checkout">去支付</div>
                </router-link>
                <div class="amount">待付：
                    <span class="paymentValue">￥{{shop.total.toFixed(2)}}</span>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
    import '../../../assets/shopPreOrder.css'

    export default {
        data() {
            return {
                shop: {}
            }
        },
        created() {
            console.log(this.$route.params.ShopOrder);
            this.shop = this.$route.params.ShopOrder;           
        }
    }
</script>

