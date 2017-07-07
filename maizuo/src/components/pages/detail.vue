<template>
    <div id="detail" v-if="detail !== null">
        <div class="img-container">
            <img :src="detail.cover.origin" />
        </div>
        <div class="film-introduce">
            <div class="film-word1">影片简介</div>
            <div class="film-word2">
                <span>导&nbsp;&nbsp;演：</span>
                <span>{{detail.director}}</span>
            </div>
            <div class="film-word2">
                <span>主&nbsp;&nbsp;演：</span>
                <span>{{detail.actors | getActors}}</span>
            </div>
            <div class="film-word2">
                <span>地区语言：</span>
                <span>{{detail.nation}}({{detail.language}})</span>
            </div>
            <div class="film-word2">
                <span>类&nbsp;&nbsp;型：</span>
                <span>{{detail.category}}</span>
            </div>
            <div class="film-word2">
                <span>上映日期：</span>
                <span>{{detail.premiereAt|formatDate}}</span>
            </div>
            <div class="film-word3">
                {{detail.synopsis}}
            </div>                                                             
        </div>
        <div class="operation">
            <!--<a href="#" class="buy-btn">立即购票</a>-->
            <router-link :to="{ name: 'cinemaById', params: { id: detail.id }}" class="buy-btn">
                立即购票
            </router-link>
        </div>         
    </div>    
</template>

<script>
    import '../../assets/detail.css'
    import {mapGetters} from 'vuex'

    export default {
        created() {
            document.body.scrollTop = 0;
            let id = this.$route.params.id;
            let title = this.$route.params.title;
            this.$store.dispatch('getFilmDetail', id);
            this.$store.dispatch('changeTitle', title);
        },
        filters:{
            getActors(items) {
                let str = '';
                items.map((item,index) => {
                    if (index !== items.length - 1) {
                        str += item.name + '|'
                    } else {
                        str += item.name
                    }
                })
                return str;
            },
            formatDate(item) {
                let date = new Date(item*1),
					month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
					day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
				
				return `${month}月${day}日上映`
            }            
        },
        computed:mapGetters({
            detail: 'getFilmDetail'
        })
    }
</script>

