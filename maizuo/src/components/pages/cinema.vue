<template>
    <div id="cinema" v-if="list.length>0">
        <div class="citem" v-for="item in district">
            <div class="title" @click="changeArea(item.pinyin)">
                {{item.name}}
            </div>
            <div class="list" style="background: #fff;" v-if='pinyin == item.pinyin'>
                    <div class="shop" v-for="shop in list" v-if="shop.district.pinyin == item.pinyin">
                        <router-link :to="{ name: 'cinemadetail', params: { id: shop.id, title: shop.name}}">
                            <div class="desc">
                                <div class="desc-title">
                                    <span>{{shop.name}}</span>
                                    <span>座</span>
                                    <span v-if="shop.itemTypes.length>3">通</span>
                                </div>
                                <div class="tip">
                                    <span v-for="tip in shop.labels" v-if="tip.type != 'REFUNDABLE_SEAT_TICKET'" :class="tip.type.toLocaleLowerCase()">{{tip.name}}</span>
                                </div>
                                <div class="area">{{shop.address}}</div>
                                <div class="extra">距离未知</div>
                            </div>
                            <i class="iconfont icon-jiantou-right cright"></i>
                        </router-link>
                    </div>
            </div>
        </div>
                             
    </div>
</template>

<script>
    import '../../assets/cinema.css'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                pinyin: ''
            }        
        },
        created() {
            this.$store.dispatch('changeTitle', "全部电影");
            if (this.list.length == 0) {
                this.$store.dispatch('getCinemaList')
            }            
        },
        computed: {
            ...mapGetters({
                list: 'getCinemaList'  
            }),
            district() {
                // this.pinyin = this.$store.getters.getDistrict[0].pinyin;
                return this.$store.getters.getDistrict;
            }            
        },
        methods: {
            changeArea(area) {
                if (this.pinyin == area) {
                    this.pinyin = '';
                    return true
                }
                this.pinyin = area;
                return true;
            }
        }
    }
</script>



